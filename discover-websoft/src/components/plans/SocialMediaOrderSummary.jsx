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
        {value}
      </span>

    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

export default function SocialMediaOrderSummary({
  quotationSelection,
  quotationMeta = {},
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedItems =
    quotationSelection?.selectedItems || [];

  const months =
    quotationSelection?.months || 1;

  /* ==========================================
      UNIQUE PLATFORMS
  ========================================== */

  const platforms = [
    ...new Set(
      selectedItems.map((item) => item.platform)
    ),
  ];

  /* ==========================================
      TEMPORARY CALCULATION
      (Backend Later)
  ========================================== */

  const subtotal =
    selectedItems.length * months * 1000;

  // Flat 18% preview only -- the real CGST+SGST vs. IGST split happens
  // at checkout once a delivery pincode is entered.
  const gst = subtotal * 0.18;

  const grandTotal = subtotal + gst;

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

      {/* Header */}

      <div className="border-b border-[#E7CF99] pb-4">

        <h2 className="text-[15px] font-bold text-[#202020]">
          Order Summary
        </h2>

      </div>

      {/* Summary */}

      <div className="mt-4 space-y-2.5">

        <SummaryRow
          label="Platform"
          value={
            platforms.length
              ? platforms.join(", ")
              : "-"
          }
        />

        <SummaryRow
          label="Months"
          value={months}
        />

        <SummaryRow
          label="Selected Services"
          value={selectedItems.length}
        />

      </div>

      <div className="my-5 border-t border-[#E7CF99]" />

      <div className="space-y-2.5">
        <SummaryRow
          label="SUBTOTAL"
          value={`₹${subtotal.toLocaleString()}`}
          bold
        />

        <SummaryRow
          label="GST (18%)"
          value={`₹${gst.toLocaleString()}`}
        />
      </div>

      <div className="my-5 border-t border-[#E7CF99]" />

      <SummaryRow
        label="GRAND TOTAL"
        value={`₹${grandTotal.toLocaleString()}`}
        large
      />

      <button
        type="button"
        onClick={() => {
          dispatch(
            addToCart({
              slug: quotationMeta.planSlug || quotationMeta.serviceSlug,
              name: quotationMeta.planName || "Social Media Plan",
              price: subtotal,
              serviceSlug: quotationMeta.serviceSlug,
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

    </div>
  );
}