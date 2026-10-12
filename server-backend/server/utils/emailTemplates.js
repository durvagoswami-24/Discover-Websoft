// Shared HTML email layout -- a table-based wrapper (not flexbox/grid,
// which many email clients like Outlook strip or mangle) with every
// style inline, since most inboxes ignore a <style> block entirely.
// Matches the site's amber/gold brand: dark header, cream background,
// white content card.
function layout({ preheader, bodyHtml }) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0; padding:0; background-color:#FDF6E8; font-family: Arial, Helvetica, sans-serif;">
    <!-- Preheader: hidden preview text shown next to the subject line in most inboxes -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      ${escapeHtml(preheader || "")}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDF6E8; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

            <!-- Header -->
            <tr>
              <td style="background-color:#202020; border-radius:16px 16px 0 0; padding:24px 32px;">
                <span style="color:#F5C15C; font-size:20px; font-weight:bold; letter-spacing:0.5px;">
                  Discover Websoft
                </span>
              </td>
            </tr>

            <!-- Body card -->
            <tr>
              <td style="background-color:#ffffff; border:1px solid #E7CF99; border-top:none; padding:32px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#FCEBC5; border-radius:0 0 16px 16px; border:1px solid #E7CF99; border-top:none; padding:20px 32px; text-align:center;">
                <p style="margin:0; font-size:12px; color:#8a7c5c;">
                  Discover Websoft &middot; This is an automated email regarding your service request.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

// Escape all values that can come from a customer or admin before inserting
// them into HTML email. Email content is generated on the server but several
// values originate in user-submitted forms.
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

// A small reusable "pill" style row, used for both the customer's price
// display and the admin's lead-detail rows below.
function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:8px 0; font-size:13px; color:#8a7c5c; width:140px;">${label}</td>
      <td style="padding:8px 0; font-size:13px; color:#202020; font-weight:600;">${value}</td>
    </tr>
  `;
}

function humanize(value) {
  return String(value ?? "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatSelectionValue(value) {
  if (Array.isArray(value)) return value.map(formatSelectionValue).filter(Boolean).join(", ");
  if (value && typeof value === "object") return "";
  return typeof value === "string" ? humanize(value) : String(value ?? "");
}

function quotationDetailRows(details = {}) {
  if (!details || typeof details !== "object" || Array.isArray(details)) return [];

  const rows = [];
  const labels = {
    extraPages: "Additional pages",
    products: "Products",
    mockups: "Mockups",
    quantity: "Quantity",
    months: "Duration (months)",
    platforms: "Platforms",
    selectedItems: "Selected services",
  };

  if (details.selections && typeof details.selections === "object") {
    for (const [key, value] of Object.entries(details.selections)) {
      const formatted = formatSelectionValue(value);
      if (formatted) rows.push([humanize(key), formatted]);
    }
  }

  for (const [key, value] of Object.entries(details)) {
    if (["selections", "selectedPlan", "pincode", "note"].includes(key)) continue;
    const formatted = formatSelectionValue(value);
    if (formatted) rows.push([labels[key] || humanize(key), formatted]);
  }
  return rows;
}

// Customer-facing confirmation email -- sent both at submission time and
// whenever the admin manually (re)sends from the dashboard.
function customerQuotationEmail({
  displayName,
  displayPlan,
  serviceName,
  quotationType,
  details,
  subtotal,
  cgst,
  sgst,
  igst,
  grandTotal,
  planPrice,
  adminNote,
}) {
  const safeName = escapeHtml(displayName || "there");
  const safePlan = escapeHtml(displayPlan || "your selected service");
  const safeNote = adminNote ? escapeHtml(adminNote).replace(/\n/g, "<br>") : "";
  const isStatic = quotationType === "quick_quote";
  const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
  const detailRows = quotationDetailRows(details);
  const dynamicRows = [
    ["Subtotal", subtotal],
    ["CGST", cgst],
    ["SGST", sgst],
    ["IGST", igst],
  ].filter(([, value]) => value != null && Number(value) !== 0);

  const bodyHtml = `
    <div style="display:inline-block; margin:0 0 16px; padding:7px 11px; border-radius:999px; background:#FFF3D8; color:#805A16; font-size:11px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">
      ${isStatic ? "Fixed plan quotation" : "Custom quotation"}
    </div>
    <h1 style="margin:0 0 10px; font-size:26px; line-height:32px; color:#202020;">Thanks, ${safeName}.</h1>
    <p style="margin:0 0 22px; font-size:15px; line-height:24px; color:#5b5140;">
      ${isStatic
        ? `The fixed plan price for <strong style="color:#202020;">${safePlan}</strong> is shown below. The quotation and relevant terms &amp; conditions are attached.`
        : `We’ve prepared a quotation for <strong style="color:#202020;">${safePlan}</strong> based on the options you selected. See the breakdown below; your quotation and relevant terms &amp; conditions are attached.`}
    </p>

    ${isStatic ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px; border:1px solid #EAD9B5; border-radius:12px; background:#FFFCF6;">
      <tr><td style="padding:18px 20px 6px; font-size:12px; color:#76694F; text-transform:uppercase; letter-spacing:1px;">Plan price</td></tr>
      <tr><td style="padding:0 20px 18px; font-size:30px; line-height:36px; color:#202020; font-weight:bold;">${money(planPrice)}</td></tr>
    </table>` : `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px; border:1px solid #EAD9B5; background:#FFFCF6;">
      <tr><td colspan="2" style="padding:12px 14px; background:#202020; color:#F5C15C; font-size:12px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">${escapeHtml(serviceName || "Selected options")}</td></tr>
      ${detailRows.map(([label, value], index) => `<tr><td style="padding:10px 14px; border-bottom:1px solid #F0E6CF; font-size:13px; color:#76694F;">${escapeHtml(label)}</td><td align="right" style="padding:10px 14px; border-bottom:1px solid #F0E6CF; font-size:13px; color:#202020; font-weight:bold;">${escapeHtml(value)}</td></tr>`).join("")}
      ${dynamicRows.map(([label, value]) => `<tr><td style="padding:9px 14px; border-top:1px solid #F0E6CF; font-size:13px; color:#76694F;">${label}</td><td align="right" style="padding:9px 14px; border-top:1px solid #F0E6CF; font-size:13px; color:#202020;">${money(value)}</td></tr>`).join("")}
      <tr><td style="padding:14px; border-top:2px solid #E7CF99; font-size:14px; color:#202020; font-weight:bold;">Grand total</td><td align="right" style="padding:14px; border-top:2px solid #E7CF99; font-size:18px; color:#202020; font-weight:bold;">${money(grandTotal)}</td></tr>
    </table>`}

    ${
      adminNote
        ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="background-color:#FDF6E8; border:1px solid #E7CF99; border-radius:12px; padding:16px;">
          <p style="margin:0 0 4px; font-size:12px; font-weight:bold; color:#8a7c5c; text-transform:uppercase; letter-spacing:0.5px;">
            A note from our team
          </p>
          <p style="margin:0; font-size:14px; line-height:20px; color:#202020;">
            ${safeNote}
          </p>
        </td>
      </tr>
    </table>
    `
        : ""
    }

    <p style="margin:0 0 24px; font-size:14px; line-height:22px; color:#5b5140;">
      Our team will review the request and contact you about the details and next steps. You can reply to this email if you have any questions.
    </p>

    <p style="margin:0; font-size:14px; color:#202020;">
      -- The Discover Websoft Team
    </p>
  `;

  return layout({
    preheader: `${isStatic ? "Fixed-plan quotation" : "Custom quotation"} for ${displayPlan} is attached.`,
    bodyHtml,
  });
}

// Internal lead-notification email, sent to the business inbox whenever
// a new quote request comes in (not sent for admin-triggered resends,
// since the admin is the one sending those).
function adminQuotationEmail({
  customerName,
  customerPhone,
  customerEmail,
  serviceSlug,
  displayPlan,
  quotationType,
  planPrice,
  cgst,
  sgst,
  igst,
  grandTotal,
  quotationId,
}) {
  const rows = [
    detailRow("Name", escapeHtml(customerName || "-")),
    detailRow("Phone", escapeHtml(customerPhone || "-")),
    detailRow("Email", escapeHtml(customerEmail || "-")),
    detailRow("Service", escapeHtml(serviceSlug)),
    detailRow("Plan", escapeHtml(displayPlan)),
    detailRow("Type", escapeHtml(quotationType || "-")),
    planPrice ? detailRow("Plan Price", `₹${Number(planPrice).toLocaleString("en-IN")}`) : "",
    cgst ? detailRow("CGST", `₹${Number(cgst).toLocaleString("en-IN")}`) : "",
    sgst ? detailRow("SGST", `₹${Number(sgst).toLocaleString("en-IN")}`) : "",
    igst ? detailRow("IGST", `₹${Number(igst).toLocaleString("en-IN")}`) : "",
    grandTotal ? detailRow("Grand Total", `₹${Number(grandTotal).toLocaleString("en-IN")}`) : "",
  ].join("");

  const bodyHtml = `
    <h1 style="margin:0 0 4px; font-size:20px; color:#202020;">New Quote Request</h1>
    <p style="margin:0 0 20px; font-size:13px; color:#5b5140;">
      The quotation and terms &amp; conditions PDFs are attached.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #F0E6CF;">
      ${rows}
    </table>

    <p style="margin:20px 0 0; font-size:12px; color:#a89a7c;">
      Quotation ID: ${escapeHtml(quotationId)}
    </p>
  `;

  return layout({
    preheader: `New quote request: ${displayPlan}`,
    bodyHtml,
  });
}

module.exports = { customerQuotationEmail, adminQuotationEmail };
