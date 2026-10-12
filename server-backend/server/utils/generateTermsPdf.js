const PDFDocument = require("pdfkit");

// NOTE: The text below is generic placeholder content, NOT reviewed or
// approved legal language. Replace this with your actual terms (ideally
// drafted or reviewed by a lawyer) before relying on it in production --
// this exists so the PDF-attachment flow works end-to-end today.
const TERMS_SECTIONS = [
  {
    heading: "1. Quotation Validity",
    body: "This quotation is valid for 15 days from the date of issue. Prices are subject to change after this period based on scope, material, or third-party costs at the time of confirmation.",
  },
  {
    heading: "2. Payment Terms",
    body: "Unless otherwise agreed in writing, 50% of the total amount is payable as an advance to begin work, with the remaining balance due before final delivery/handover.",
  },
  {
    heading: "3. Project Timeline",
    body: "Estimated delivery timelines are shared separately based on project scope and will begin only after the advance payment and all required inputs (content, assets, approvals) are received from the client.",
  },
  {
    heading: "4. Revisions",
    body: "The number of revision rounds included depends on the selected plan. Additional revisions beyond what's included may be chargeable at an hourly or per-request rate.",
  },
  {
    heading: "5. Cancellation & Refunds",
    body: "Any advance paid is non-refundable once work has commenced. If a project is cancelled before work begins, a refund may be issued after deducting any costs already incurred.",
  },
  {
    heading: "6. Intellectual Property",
    body: "Ownership of final deliverables transfers to the client only after full payment has been received. Discover Websoft retains the right to showcase completed work in its portfolio unless the client requests otherwise in writing.",
  },
  {
    heading: "7. Taxes",
    body: "All prices are exclusive of applicable government taxes (GST/CGST/SGST) unless explicitly stated otherwise in the quotation.",
  },
  {
    heading: "8. Confidentiality",
    body: "Both parties agree to keep any shared business, technical, or personal information confidential and not disclose it to third parties without prior written consent.",
  },
];

function drawTermsDoc(doc) {
  doc
    .fontSize(20)
    .fillColor("#202020")
    .text("Discover Websoft")
    .fontSize(10)
    .fillColor("#8a7c5c")
    .text("Terms & Conditions")
    .moveDown(1.5);

  TERMS_SECTIONS.forEach((section) => {
    doc
      .fontSize(12)
      .fillColor("#202020")
      .text(section.heading)
      .moveDown(0.2);
    doc
      .fontSize(10)
      .fillColor("#5b5140")
      .text(section.body, { align: "justify" })
      .moveDown(0.8);
  });

  doc
    .moveDown(1)
    .fontSize(8)
    .fillColor("#a89a7c")
    .text(
      "These are general placeholder terms. Please contact us directly for a copy of the terms specific to your project.",
      { align: "center" }
    );
}

// Builds the Terms & Conditions PDF fully in memory, for attaching to
// the customer's confirmation email.
function generateTermsPdfBuffer() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    drawTermsDoc(doc);
    doc.end();
  });
}

module.exports = { generateTermsPdfBuffer };
