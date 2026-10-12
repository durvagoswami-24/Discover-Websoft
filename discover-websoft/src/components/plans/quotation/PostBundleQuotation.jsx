export default function PostBundleQuotation({
  service,
  selectedPlan,
  quotationSelection,
  setQuotationSelection,
}) {
  const quantityLabel = selectedPlan?.quotation?.quantityLabel || "Units";
  const quantity = quotationSelection.quantity;

  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-[#E6C980]
        bg-[#FCEBC5]
        shadow-[0_10px_28px_rgba(0,0,0,.08)]
      "
    >
      {/* Header */}

      <div className="border-b border-[#E7CF99] bg-[#F7D38A] px-8 py-8">
        <h2 className="text-[20px] font-bold text-[#202020]">
          Select {quantityLabel} Quantity
        </h2>

        <p className="mt-2 text-[14px] text-[#202020]">
          Choose the total number of {quantityLabel.toLowerCase()} included in this bundle.
        </p>
      </div>

      {/* Body */}

      <div className="flex items-center justify-between px-8 py-8">

        <div>

          <h3 className="text-[17px] font-semibold text-[#202020]">
            {quantityLabel} Quantity
          </h3>

          <p className="mt-1 text-[13px] text-[#202020]">
            Increase or decrease the required quantity.
          </p>

        </div>

        <div
          className="
            flex
            items-center
            overflow-hidden
            rounded-xl
            border
            border-[#E7CF99]
            bg-[#FDF0D2]
          "
        >

          <button
            onClick={() =>
              setQuotationSelection((prev) => ({
                ...prev,
                quantity: Math.max(1, prev.quantity - 1),
              }))
            }
            className="h-12 w-12 text-[22px] font-bold hover:bg-[#F7D38A]"
          >
            −
          </button>

          <span className="w-12 text-center text-[18px] font-bold">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuotationSelection((prev) => ({
                ...prev,
                quantity: prev.quantity + 1,
              }))
            }
            className="h-12 w-12 text-[22px] font-bold hover:bg-[#F7D38A]"
          >
            +
          </button>

        </div>

      </div>

    </div>
  );
}