function CustomRadio({ checked }) {
  return (
    <div
      className={`
        flex h-[18px] w-[18px] items-center justify-center rounded-full
        border transition-all duration-200
        ${
          checked
            ? "border-[#F59E0B]"
            : "border-[#8D8D8D]"
        }
      `}
    >
      {checked && (
        <div className="h-[8px] w-[8px] rounded-full bg-[#F59E0B]" />
      )}
    </div>
  );
}
function IncludedIcon() {
  return (
    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F59E0B]">
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}



export default function WebsiteQuotation({
  service,
  selectedPlan,
  quotationSelection,
  setQuotationSelection,
}) {
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
      {/* ===========================
            TABLE HEADER
      =========================== */}

      <div
        className="border-b border-[#E7CF99] bg-[#F7D38A] px-8 py-8"
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `1.35fr repeat(${service.plans.length}, 1fr)`,
          }}
        >
          {/* Feature Column */}

          <div className="flex items-center">
            <h3 className="text-[15px] font-bold uppercase tracking-[2px] text-[#444]">
              Features
            </h3>
          </div>

          {/* Plan Columns */}

         {service.plans.map((plan) => (
  <div
    key={plan.id}
    className="flex items-center justify-center"
  >
    <h3 className="text-[18px] font-bold text-[#202020]">
      {plan.subtitle}
    </h3>
  </div>
))}
        </div>
      </div>

      {/* ===========================
            TABLE BODY
      =========================== */}

     <div className="bg-[#FDF0D2]">
  {service.quotationStructure.map((feature) => (
    <div
      key={feature.id}
      className="grid border-b border-[#E7CF99]"
      style={{
        gridTemplateColumns: `1.35fr repeat(${service.plans.length},1fr)`,
      }}
    >

      
      {/* ==========================
            FEATURE COLUMN
      ========================== */}

      <div className="p-5">
        <h4 className="text-[16px] font-semibold text-[#202020]">
          {feature.label}
        </h4>

        {feature.description && (
          <p className="mt-1 text-[11px] leading-[15px] text-[#202020]">
            {feature.description}
          </p>
        )}
      </div>

      {/* ==========================
            PLAN VALUES
      ========================== */}

      {service.plans.map((plan) => {
        const value =
          plan.quotation.values[feature.id];

        return (
         <div
  key={plan.id}
  onClick={() =>
    setQuotationSelection((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        [feature.id]: plan.slug,
      },
    }))
  }
  className="
    flex
    cursor-pointer
    items-center
    gap-3
    border-l
    border-[#E7CF99]
    px-5
    transition-all
    duration-200
    hover:bg-[#FFF4DB]
  "
>
        {feature.type === "included" ? (
  <>
    <IncludedIcon />

    <span className="font-medium text-[#F59E0B]">
      Included
    </span>
  </>
) : (
  <>
    <CustomRadio
      checked={
        quotationSelection.selections[feature.id] ===
        plan.slug
      }
    />

    <span className="text-[15px] font-medium text-[#202020]">
      ₹{value.toLocaleString()}/-
    </span>
  </>
)}
          </div>
        );
      })}

      
    </div>
    
  ))}
  <div className="flex items-center justify-between border-t border-[#E7CF99] px-6 py-4">

  <p className="text-[14px] font-bold tracking-[1px] text-[#3D3D3D] uppercase">
    Extra Page Charges:
    <span className="ml-1">
      ₹{selectedPlan.quotation.extraPagePrice.toLocaleString()}/- Per Page
    </span>
  </p>

  <div className="flex items-center overflow-hidden rounded-xl border border-[#E7CF99] bg-[#FCEBC5]">

    <button
      onClick={() =>
        setQuotationSelection((prev) => ({
          ...prev,
          extraPages: Math.max(0, prev.extraPages - 1),
        }))
      }
      className="h-10 w-10 text-xl font-bold"
    >
      −
    </button>

    <span className="w-10 text-center font-semibold">
      {quotationSelection.extraPages}
    </span>

    <button
      onClick={() =>
        setQuotationSelection((prev) => ({
          ...prev,
          extraPages: prev.extraPages + 1,
        }))
      }
      className="h-10 w-10 text-xl font-bold"
    >
      +
    </button>

  </div>

</div>
</div>
    </div>
  );
}