function SummaryRow({
  label,
  value,
  bold = false,
  large = false,
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`
          ${
            bold
              ? "font-bold"
              : "font-medium"
          }
          ${
            large
              ? "text-[14px]"
              : "text-[12.5px]"
          }
          text-[#202020]
        `}
      >
        {label}
      </span>

      <span
        className={`
          ${
            bold
              ? "font-bold"
              : "font-semibold"
          }
          ${
            large
              ? "text-[18px]"
              : "text-[12.5px]"
          }
          text-[#202020]
        `}
      >
        {typeof value === "number"
          ? `₹${value.toLocaleString()}`
          : value}
      </span>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

export default function OrderSummary({
  service,
  plan,
  quotationSelection,
  quotationMeta = {},
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ==========================================
  // Selected Values
  // ==========================================

 const selectedValues = {};

if (service.quotationStructure) {
  service.quotationStructure.forEach((feature) => {
    const selectedPlanSlug =
      quotationSelection.selections[feature.id];

    const selectedPlan = service.plans.find(
      (plan) => plan.slug === selectedPlanSlug
    );

    if (selectedPlan) {
      selectedValues[feature.id] =
        selectedPlan.quotation.values[feature.id];
    }
  });
}
// ==========================================
// Ecommerce Extras
// ==========================================

const selectedWebsitePlan =
  service.plans.find(
    (plan) =>
      plan.slug === quotationSelection.selections.website
  ) || {};

const extraPagePrice =
  selectedWebsitePlan?.quotation?.extraPagePrice || 0;

const perProductPrice =
  selectedWebsitePlan?.quotation?.perProductPrice || 0;

const mockupPrice =
  selectedWebsitePlan?.quotation?.mockupPrice || 0;

const extraPagesTotal =
  quotationSelection.extraPages * extraPagePrice;

const productsTotal =
  quotationSelection.products * perProductPrice;

const mockupsTotal =
  quotationSelection.mockups * mockupPrice;
  // ==========================================
  // Calculations
  // ==========================================

 const subtotal =
  Object.values(selectedValues)
    .filter((value) => typeof value === "number")
    .reduce((sum, value) => sum + value, 0) +
  extraPagesTotal +
  productsTotal +
  mockupsTotal;

// A single flat 18% preview here -- the real CGST+SGST vs. IGST split
// is only determined at checkout, once the customer enters their
// delivery pincode (see QuoteConfirmButton).
const gst = subtotal * 0.18;
const grandTotal = subtotal + gst;

// ==========================================
// Current Quotation Type
// ==========================================

const quotationType = service.quotationType;

// ==========================================
// Selected Plan (Quantity Services)
// ==========================================

const selectedPlan =
  service.plans?.find(
    (plan) => plan.slug === quotationSelection.selectedPlan
  ) || service.plans?.[0];

// ==========================================
// Quantity Quotation
// ==========================================

const quantity = quotationSelection.quantity || 1;

const quantitySubtotal =
  (selectedPlan?.price || 0) * quantity;

const quantityGst = quantitySubtotal * 0.18;

const quantityGrandTotal = quantitySubtotal + quantityGst;

// ==========================================
// Whichever flow is active right now
// ==========================================

const isQuantityFlow =
  quotationType === "quantity" || quotationType === "bundle";

const activeSubtotal = isQuantityFlow ? quantitySubtotal : subtotal;
const activeGst = isQuantityFlow ? quantityGst : gst;
const activeGrandTotal = isQuantityFlow ? quantityGrandTotal : grandTotal;

  return (
    <div
      className="
h-[520px]
rounded-[24px]
border
border-[#EACB8B]
bg-[#FFE9B9]
shadow-[0_10px_24px_rgba(0,0,0,.08)]
px-6
py-6
"
    >
      <>
  {/* Header */}

  <div className="border-b border-[#E7CF99] pb-4">
   <h2 className="text-[15px] font-bold text-[#202020]">
      Order Summary
    </h2>
  </div>

  {/* Selected Items */}

  <div className="mt-4 space-y-2.5">

  {(quotationType === "quantity" || quotationType === "bundle") ? (
  <>
    <SummaryRow
      label="Plan"
      value={selectedPlan?.name}
    />

    <SummaryRow
      label="Unit Price"
      value={selectedPlan?.price}
    />

    <SummaryRow
      label={selectedPlan?.quotation?.quantityLabel || "Quantity"}
      value={quantity}
    />
  </>
) : (
  <>
    <SummaryRow
      label={
        quotationType === "ecommerce"
          ? "E-Commerce Website"
          : "Website Design"
      }
      value={selectedValues.website}
    />

    <SummaryRow
      label="Domain (1 Year)"
      value={selectedValues.domain}
    />

    <SummaryRow
      label="Hosting (1 Year)"
      value={selectedValues.hosting}
    />

    <SummaryRow
      label="Business Email"
      value="Included"
    />

    {(quotationType === "website" ||
      quotationType === "ecommerce") && (
      <SummaryRow
        label={`Extra Pages (${quotationSelection.extraPages})`}
        value={`₹${extraPagesTotal.toLocaleString()}`}
      />
    )}

    {quotationType === "ecommerce" && (
      <>
        <SummaryRow
          label={`Products (${quotationSelection.products})`}
          value={`₹${productsTotal.toLocaleString()}`}
        />

        <SummaryRow
          label={`Mockups (${quotationSelection.mockups})`}
          value={`₹${mockupsTotal.toLocaleString()}`}
        />
      </>
    )}
  </>
)}
</div>

  <div className="my-5 border-t border-[#E7CF99]" />

  <div className="space-y-2.5">
    <SummaryRow
      label="SUBTOTAL"
      value={`₹${activeSubtotal.toLocaleString()}`}
      bold
    />

    <SummaryRow
      label="GST (18%)"
      value={`₹${activeGst.toLocaleString()}`}
    />
  </div>

  <div className="my-5 border-t border-[#E7CF99]" />

  <SummaryRow
    label="GRAND TOTAL"
    value={`₹${activeGrandTotal.toLocaleString()}`}
    large
  />

  <button
    type="button"
    onClick={() => {
      dispatch(
        addToCart({
          slug: quotationMeta.planSlug,
          name: quotationMeta.planName,
          price: activeSubtotal,
          image: plan?.image,
          serviceSlug: quotationMeta.serviceSlug,
          serviceTitle: service?.title,
          subServiceSlug: quotationMeta.subServiceSlug,
          quotationType: quotationMeta.quotationType,
          details: quotationSelection,
        })
      );
      navigate("/cart");
    }}
    className="
      mt-6
      h-[42px]
      w-full
      rounded-xl
      bg-[#202020]
      text-[13px]
      font-bold
      tracking-[2px]
      text-[#F7D38A]
      transition-all
      hover:bg-black
    "
  >
    CONFIRM SELECTION
  </button>

  <p className="mt-3 text-center text-[10px] text-[#202020]">
    * TERMS AND CONDITIONS APPLY
  </p>
</>
    </div>
  );
}
