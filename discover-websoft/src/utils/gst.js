// Simplified pincode -> "is this Madhya Pradesh?" check for GST purposes.
// Madhya Pradesh PIN codes fall in the 450000-488999 range (i.e. the
// first two digits are 45-48). This is a practical range check for
// invoicing, not an exhaustive official source -- worth confirming with
// an accountant/CA if exact GST compliance matters for edge-case pincodes.
export function isMadhyaPradeshPincode(pincode) {
  if (!/^\d{6}$/.test(pincode)) return null; // not a complete pincode yet
  const prefix = parseInt(pincode.slice(0, 2), 10);
  return prefix >= 45 && prefix <= 48;
}

// Returns the GST breakdown to display/charge for a given subtotal,
// based on the customer's pincode:
//  - no/incomplete pincode yet -> a single combined "GST (18%)" line
//  - Madhya Pradesh pincode     -> CGST (9%) + SGST (9%)
//  - any other state's pincode  -> IGST (18%)
export function getGstBreakdown(pincode, subtotal) {
  const isMP = isMadhyaPradeshPincode(pincode);

  if (isMP === null) {
    const gst = subtotal * 0.18;
    return {
      type: "combined",
      gst,
      totalTax: gst,
      grandTotal: subtotal + gst,
    };
  }

  if (isMP) {
    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    return {
      type: "split",
      cgst,
      sgst,
      totalTax: cgst + sgst,
      grandTotal: subtotal + cgst + sgst,
    };
  }

  const igst = subtotal * 0.18;
  return {
    type: "igst",
    igst,
    totalTax: igst,
    grandTotal: subtotal + igst,
  };
}
