const Quotation = require("../models/Quotation");
const { sendEmail } = require("../utils/sendEmail");
const { generateQuotationPdfBuffer } = require("../utils/generateQuotationPdf");
const { getTermsPdfForService } = require("../utils/termsPdfLookup");
const { rasterizePdfToImageOnly } = require("../utils/rasterizePdf");
const {
  customerQuotationEmail,
  adminQuotationEmail,
} = require("../utils/emailTemplates");

// POST /api/quotations  -- public (works for logged-in users AND guests)
// If the request has a valid Authorization header, req.user is optionally
// attached upstream by an "attachUserIfPresent" style check -- but to keep
// this route genuinely public (guests must be able to submit quotes),
// the user link is optional and only set if req.user exists.
async function createQuotation(req, res) {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceSlug,
      subServiceSlug,
      subSubServiceSlug,
      planSlug,
      planName,
      quotationType,
      planPrice,
      details,
      subtotal,
      cgst,
      sgst,
      igst,
      grandTotal,
    } = req.body;

    // An authenticated account is the source of truth for its registered
    // contact details; never let a stale or edited client field redirect mail.
    const resolvedCustomerName = req.user?.name || customerName;
    const resolvedCustomerPhone = req.user?.phone || customerPhone;
    const resolvedCustomerEmail = req.user?.email || customerEmail;

    if (!serviceSlug || !planSlug) {
      return res
        .status(400)
        .json({ message: "serviceSlug and planSlug are required" });
    }

    const quotation = await Quotation.create({
      user: req.user ? req.user._id : undefined,
      customerName: resolvedCustomerName,
      customerPhone: resolvedCustomerPhone,
      customerEmail: resolvedCustomerEmail,
      serviceSlug,
      subServiceSlug,
      subSubServiceSlug,
      planSlug,
      planName,
      quotationType,
      planPrice,
      details,
      subtotal,
      cgst,
      sgst,
      igst,
      grandTotal,
    });

    // The quotation is saved first. Email failures are reported separately
    // so they don't hide a successfully stored request from the customer.
    // Return the successful quotation response immediately.
// Email delivery should not block quotation submission.
res.status(201).json({
  quotation,
  customerEmailSent: false,
});

// Send emails in the background.
sendQuotationEmails({
  quotation,
  customerName: quotation.customerName,
  customerEmail: quotation.customerEmail,
  planName: quotation.planName,
})
  .then((emailStatus) => {
    console.log("Quotation email process completed:", emailStatus);
  })
  .catch((emailError) => {
    console.error(
      "Quotation saved but email delivery failed:",
      emailError
    );
  });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not save quotation", error: err.message });
  }
}

// Sends a confirmation email to the customer (if they gave an email
// address, with their quotation + terms & conditions attached as PDFs)
// and a lead-notification email to the admin inbox. Runs in the
// background -- callers don't (and shouldn't) await this.
//
// Shared by two callers: the automatic email fired the moment a
// customer submits a quote request (createQuotation, no note yet), and
// the admin's manual "Send to Customer" action from the dashboard
// (sendQuotationToCustomer, which can include an adminNote -- e.g. a
// summary of a call -- and skips the admin-notification email since
// the admin is the one sending it).
async function sendQuotationEmails({
  quotation,
  customerName,
  customerEmail,
  planName,
  adminNote,
  notifyAdmin = true,
}) {
  const displayName = customerName || "there";
  const displayPlan = planName || quotation.planSlug;

  // Prepare protected image-only copies before sending. If flattening fails,
  // fail closed instead of attaching a text-based PDF that can be copied.
  let quotationPdf;
  try {
    const generatedQuotationPdf = await generateQuotationPdfBuffer(quotation);
    quotationPdf = await rasterizePdfToImageOnly(generatedQuotationPdf);
  } catch (err) {
    console.error("Could not prepare protected quotation PDF:", err.message);
    throw new Error("Could not prepare the protected quotation PDF.");
  }

  let termsFile = getTermsPdfForService(quotation.serviceSlug);
  if (!termsFile) {
    console.warn(
      `No Terms & Conditions PDF found for service "${quotation.serviceSlug}" -- sending without one.`
    );
  } else {
    try {
      const flattenedTerms = await rasterizePdfToImageOnly(termsFile.content);
      termsFile = { ...termsFile, content: flattenedTerms };
    } catch (err) {
      console.error("Could not prepare protected Terms & Conditions PDF:", err.message);
      throw new Error("Could not prepare the protected Terms & Conditions PDF.");
    }
  }

  const attachments = [];
  if (quotationPdf) {
    attachments.push({
      filename: `quotation-${quotation._id}.pdf`,
      content: quotationPdf,
    });
  }
  if (termsFile) {
    attachments.push({
      filename: termsFile.filename,
      content: termsFile.content,
    });
  }

  let customerEmailSent = false;
  if (customerEmail) {
    customerEmailSent = await sendEmail({
      to: customerEmail,
      subject: "We received your quote request | Discover Websoft",
      html: customerQuotationEmail({
        displayName,
        displayPlan,
        serviceName: quotation.serviceSlug.replace(/-/g, " "),
        quotationType: quotation.quotationType,
        details: quotation.details,
        subtotal: quotation.subtotal,
        cgst: quotation.cgst,
        sgst: quotation.sgst,
        igst: quotation.igst,
        grandTotal: quotation.grandTotal,
        planPrice: quotation.planPrice,
        adminNote,
      }),
      attachments,
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  let adminEmailSent = false;
  if (notifyAdmin && adminEmail) {
    adminEmailSent = await sendEmail({
      to: adminEmail,
      subject: `New quote request: ${displayPlan}`,
      html: adminQuotationEmail({
        customerName,
        customerPhone: quotation.customerPhone,
        customerEmail,
        serviceSlug: quotation.serviceSlug,
        displayPlan,
        quotationType: quotation.quotationType,
        planPrice: quotation.planPrice,
        cgst: quotation.cgst,
        sgst: quotation.sgst,
        igst: quotation.igst,
        grandTotal: quotation.grandTotal,
        quotationId: quotation._id,
      }),
      attachments,
    });
  }
  return { customerEmailSent, adminEmailSent };
}

// GET /api/quotations  (admin only) -- list all, most recent first
async function listQuotations(req, res) {
  try {
    const quotations = await Quotation.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email phone");

    res.json({ quotations });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch quotations", error: err.message });
  }
}

// GET /api/quotations/:id  (admin only)
async function getQuotation(req, res) {
  try {
    const quotation = await Quotation.findById(req.params.id).populate(
      "user",
      "name email phone"
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json({ quotation });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch quotation", error: err.message });
  }
}

// PATCH /api/quotations/:id/status  (admin only) -- body: { status }
async function updateQuotationStatus(req, res) {
  try {
    const { status } = req.body;
    const allowed = ["pending", "contacted", "converted", "closed"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json({ quotation });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not update quotation", error: err.message });
  }
}

// GET /api/quotations/:id/pdf  (admin only) -- streams a downloadable PDF
async function downloadQuotationPdf(req, res) {
  try {
    const quotation = await Quotation.findById(req.params.id).populate(
      "user",
      "name email phone"
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    const generatedPdf = await generateQuotationPdfBuffer(quotation);
    const protectedPdf = await rasterizePdfToImageOnly(generatedPdf);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="quotation-${quotation._id}.pdf"`
    );
    res.setHeader("Content-Length", protectedPdf.length);
    res.setHeader("Cache-Control", "private, no-store");
    res.send(protectedPdf);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not generate PDF", error: err.message });
  }
}

// POST /api/quotations/:id/send  (admin only) -- body: { adminNote }
// Manually (re)sends the quotation + terms & conditions to the customer,
// with an optional note attached (e.g. a summary of a call or in-person
// discussion). The note is saved on the quotation so it's visible next
// time this record is opened, and included in the PDF/email sent here.
async function sendQuotationToCustomer(req, res) {
  try {
    const { adminNote } = req.body;

    const quotation = await Quotation.findById(req.params.id).populate(
      "user",
      "name email phone"
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    const customerEmail = quotation.user?.email || quotation.customerEmail;
    if (!customerEmail) {
      return res.status(400).json({
        message: "This quotation has no customer email on file to send to.",
      });
    }

    if (adminNote !== undefined) {
      quotation.adminNote = adminNote;
    }
    quotation.lastSentAt = new Date();
    await quotation.save();

    // Awaited here (unlike the automatic send on submission) so the
    // admin dashboard can show success/failure for this specific click,
    // rather than firing and forgetting.
    const emailStatus = await sendQuotationEmails({
      quotation,
      customerName: quotation.user?.name || quotation.customerName,
      customerEmail,
      planName: quotation.planName,
      adminNote: quotation.adminNote,
      notifyAdmin: false,
    });

    if (!emailStatus.customerEmailSent) {
      return res.status(502).json({
        message: "Quotation saved, but the email could not be delivered. Check the SMTP configuration and server logs.",
        quotation,
        customerEmailSent: false,
      });
    }
    res.json({ quotation, ...emailStatus });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not send quotation", error: err.message });
  }
}

module.exports = {
  createQuotation,
  listQuotations,
  getQuotation,
  updateQuotationStatus,
  downloadQuotationPdf,
  sendQuotationToCustomer,
};
