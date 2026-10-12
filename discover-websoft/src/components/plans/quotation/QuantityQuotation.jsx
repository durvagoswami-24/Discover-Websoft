export default function QuantityQuotation({
  service,
  selectedPlan,
  quotationSelection,
  setQuotationSelection,
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-[#E8D5A7]
        bg-[#F8DCA3]
        shadow-[0_8px_22px_rgba(0,0,0,0.08)]
      "
    >
      <div className="flex items-center justify-between px-5 py-4">

        {/* ============================
              LEFT CONTENT
        ============================ */}

        <div>

          <h3
            className="
              text-[15px]
              font-bold
              uppercase
              tracking-[2px]
              text-[#202020]
            "
          >
            {selectedPlan?.quotation?.title || `${selectedPlan.name} Quantity`}
          </h3>

          <p
            className="
              mt-[3px]
              text-[11px]
              leading-[16px]
              text-[#5F5F5F]
            "
          >
            {selectedPlan?.quotation?.description}
          </p>

          <p
            className="
              mt-[6px]
              text-[10px]
              text-[#8B8B8B]
            "
          >
           {selectedPlan?.quotation?.note}
          </p>

        </div>

        {/* ============================
            QUANTITY SELECTOR
        ============================ */}

        <div
          className="
            flex
            h-[42px]
            items-center
            overflow-hidden
            rounded-[9px]
            border
            border-[#E7C97C]
            bg-[#FBE7BC]
            shadow-[0_2px_6px_rgba(0,0,0,.05)]
          "
        >

          <button
  onClick={() =>
    setQuotationSelection((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }))
  }
  className="
    flex
    h-full
    w-[42px]
    items-center
    justify-center
    text-[22px]
    font-medium
    text-[#202020]
    transition
    hover:bg-[#F5D48A]
  "
>
  −
</button>

          <div
            className="
              flex
              h-full
              w-[46px]
              items-center
              justify-center
              border-x
              border-[#E7C97C]
              text-[18px]
              font-bold
              text-[#202020]
            "
          >
          {quotationSelection.quantity}
          </div>

          <button
  onClick={() =>
    setQuotationSelection((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }))
  }
  className="
    flex
    h-full
    w-[42px]
    items-center
    justify-center
    text-[22px]
    font-medium
    text-[#202020]
    transition
    hover:bg-[#F5D48A]
  "
>
  +
</button>

        </div>

      </div>
    </div>
  );
}