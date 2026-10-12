const mongoose = require("mongoose");

// One flexible schema covers all 4 quotationTypes (website, ecommerce,
// quantity/bundle, social) -- each type's specific selections go in
// `details`, which mirrors whatever shape quotationSelection had on the
// frontend for that type. Trying to model every type's exact fields
// separately would mean a new schema every time a new quotationType is
// added; this keeps it flexible while still validating what stays fixed
// across all of them (who, what plan, what the final price was).
const quotationSchema = new mongoose.Schema(
  {
    // Who submitted it -- optional, since a guest can request a quote too
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Guest contact details, from the "Get Quote" modal (Name/Number/Email)
    customerName: { type: String, trim: true },
    customerPhone: { type: String, trim: true },
    customerEmail: { type: String, trim: true, lowercase: true },

    // What was quoted
    serviceSlug: { type: String, required: true },
    subServiceSlug: String,
    subSubServiceSlug: String,
    planSlug: { type: String, required: true },
    planName: String,
    // "quick_quote" (fixed plan, via the "Get Quote" button -- no custom
    // pricing involved) | "website" | "ecommerce" | "quantity" | "bundle"
    // | "social" (all custom-quotation types, via "Confirm Selection")
    quotationType: String,

    // The plan's own listed price -- only meaningful for "quick_quote"
    // (fixed-plan) requests, where there's no custom pricing breakdown.
    planPrice: Number,

    // Whatever quotationSelection held on the frontend for this type
    // (selections, extraPages, products, mockups, quantity, platform grid, etc.)
    details: { type: mongoose.Schema.Types.Mixed },

    // Final computed pricing, captured at submission time -- only
    // populated for custom-quotation types, not for "quick_quote".
    subtotal: Number,
    cgst: Number,
    sgst: Number,
    igst: Number,
    grandTotal: Number,

    status: {
      type: String,
      enum: ["pending", "contacted", "converted", "closed"],
      default: "pending",
    },

    // A free-text note the admin can attach when (re)sending a quotation
    // to the customer -- e.g. a summary of a phone call or in-person
    // discussion. Persists so it's visible next time this quotation is
    // opened, and is included in the PDF/email the next time it's sent.
    adminNote: { type: String, trim: true },

    // When the quotation was last emailed to the customer from the
    // admin dashboard (separate from the automatic email sent at
    // submission time) -- lets the admin see at a glance whether/when
    // they already followed up.
    lastSentAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);
