import { useEffect, useState } from "react";

/* ============================================================
    CUSTOM RADIO
============================================================ */

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

/* ============================================================
    QUANTITY SELECTOR
============================================================ */

function QuantitySelector({
  value,
  onIncrease,
  onDecrease,
}) {
  return (
    <div
     className="
  ml-2
  flex
  h-[24px]
  items-center
  overflow-hidden
  rounded-md
  border
  border-[#E3C57E]
  bg-[#F8E3B3]
  shadow-sm
"
    >
      <button
        onClick={onDecrease}
        className="
  w-6
  text-center
  text-[12px]
  font-semibold
  text-[#202020]
"
      >
        −
      </button>

      <span className="w-6 text-center text-[12px] font-semibold">
        {value}
      </span>

      <button
        onClick={onIncrease}
        className="
  w-6
  text-[13px]
  font-bold
  text-[#202020]
  transition-colors
  hover:bg-[#F7D38A]
"
      >
        +
      </button>
    </div>
  );
}

/* ============================================================
    PLATFORM HEADER
============================================================ */

const platforms = [
  "Instagram",
  "Facebook",
  "Youtube",
  "Pinterest",
  "LinkedIn",
];

/* ============================================================
    SERVICES
============================================================ */

const rows = [
  "Feed Posts",
  "Carousel Posts",
  "Stories",
  "Reels / Shorts",
  "Long-Form Videos",
  "Thumbnail Design",
  "Channel Banner Design",
  "Intro & Outro Videos",
  "Community Posts",
  "Video SEO (Title, Description, Tags)",
  "Pin Design",
  "Idea Pins",
  "Product Pins",
  "Infographic Pins",
  "Blog Promotion Pins",
  "Board Cover Design",
  "Professional Posts",
  "Company Page Banner",
  "Corporate Graphics",
  "Thought Leadership Posts",
  "Employee Branding Posts",
  "Ad Creatives",
  "Profile / Page Branding",
  "Content Writing & Captions",
  "Content Calendar Planning",
  "Employee Branding Posts",
];

/* ============================================================
      FIGMA PLATFORM MAP
============================================================ */

const platformMap = {
  "Feed Posts": [
    "instagram",
    "facebook",
    "linkedin",
  ],

  "Carousel Posts": [
    "instagram",
  ],

  "Stories": [
    "instagram",
    "facebook",
  ],

  "Reels / Shorts": [
    "instagram",
    "facebook",
    "youtube",
  ],

  "Long-Form Videos": [
    "facebook",
    "youtube",
  ],

  "Thumbnail Design": [
    "youtube",
  ],

  "Channel Banner Design": [
    "youtube",
  ],

  "Intro & Outro Videos": [
    "youtube",
  ],

  "Community Posts": [
    "facebook",
    "youtube",
  ],

  "Video SEO (Title, Description, Tags)": [
    "youtube",
  ],

  "Pin Design": [
    "pinterest",
  ],

  "Idea Pins": [
    "pinterest",
  ],

  "Product Pins": [
    "pinterest",
  ],

  "Infographic Pins": [
    "pinterest",
    "linkedin",
  ],

  "Blog Promotion Pins": [],

  "Board Cover Design": [
    "pinterest",
  ],

  "Professional Posts": [
    "linkedin",
  ],

  "Company Page Banner": [
    "linkedin",
  ],

  "Corporate Graphics": [
    "linkedin",
  ],

  "Thought Leadership Posts": [
    "linkedin",
  ],

  "Employee Branding Posts": [
    "linkedin",
  ],

  "Ad Creatives": [
    "instagram",
    "facebook",
    "youtube",
    "pinterest",
    "linkedin",
  ],

  "Profile / Page Branding": [
    "instagram",
    "facebook",
    "youtube",
    "pinterest",
    "linkedin",
  ],

  "Content Writing & Captions": [
    "instagram",
    "facebook",
    "youtube",
    "pinterest",
    "linkedin",
  ],

  "Content Calendar Planning": [
    "instagram",
    "facebook",
    "youtube",
    "pinterest",
    "linkedin",
  ],
};
/* ============================================================
      CELL
============================================================ */

function Cell({
  row,
  platform,
  selection,
  setSelection,
}) {
  const key = `${row}-${platform}`;
const isEnabled =
  platformMap[row]?.includes(platform);

  if (!isEnabled) {
  return (
    <div className="border-l border-[#E7CF99]" />
  );
}


  const data =
    selection[key] || {
      checked: false,
      qty: 1,
    };

  return (
    <div
     className="
  flex
  min-h-[60px]
  items-center
  justify-center
  border-l
  border-[#E7CF99]
"
    >

     <div className="flex items-center gap-2">

  <button
    onClick={() =>
      setSelection({
        ...selection,
        [key]: {
          ...data,
          checked: !data.checked,
        },
      })
    }
  >
    <CustomRadio checked={data.checked} />
  </button>

  <div
    className={`
      transition-all
      duration-300
      ${
        data.checked
          ? "opacity-100"
          : "opacity-40 pointer-events-none"
      }
    `}
  >
    <QuantitySelector
      value={data.qty}
      onIncrease={() =>
        setSelection({
          ...selection,
          [key]: {
            ...data,
            qty: data.qty + 1,
          },
        })
      }
      onDecrease={() =>
        setSelection({
          ...selection,
          [key]: {
            ...data,
            qty: Math.max(1, data.qty - 1),
          },
        })
      }
    />
  </div>

</div>

      </div>

  
  );
}

export default function SocialMediaQuotation({
  quotationSelection,
  setQuotationSelection,
}) {

  const [selection, setSelection] = useState({});

const [months, setMonths] = useState(1);

/* ============================================================
      SELECTED ITEMS
============================================================ */

const selectedItems = Object.entries(selection)
  .filter(([_, value]) => value.checked)
  .map(([key, value]) => {
    const [service, platform] = key.split("-");

    return {
      service,
      platform,
      quantity: value.qty,
    };
  });

  /* ============================================================
      SEND DATA TO PLAN PAGE
============================================================ */

useEffect(() => {
  if (!setQuotationSelection) return;

  setQuotationSelection({
    selectedItems,
    months,
  });
}, [selection, months, selectedItems, setQuotationSelection]);
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

      {/* =====================================================
              HEADER
      ====================================================== */}

      <div
        className="
          border-b
          border-[#E7CF99]
          bg-[#F7D38A]
          px-8
          py-8
        "
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns:
              "1.6fr repeat(5,1fr)",
          }}
        >
          <div className="flex items-center">
            <h3
              className="
                text-[15px]
                font-bold
                uppercase
                tracking-[1px]
                text-[#202020]
              "
            >
              Platform Selection
            </h3>
          </div>

          {platforms.map((platform) => (
            <div
              key={platform}
              className="text-center"
            >
              <h3
                className="
                  text-[17px]
                  font-bold
                  text-[#202020]
                "
              >
                {platform}
              </h3>
            </div>
          ))}
        </div>
      </div>

     {/* =====================================================
        BODY
====================================================== */}

<div className="bg-[#FDF0D2]">

  {rows.map((row) => (

    <div
      key={row}
      className="grid border-b border-[#E7CF99]"
      style={{
        gridTemplateColumns: "1.6fr repeat(5,1fr)",
      }}
    >

      {/* Row Title */}

      <div className="flex min-h-[60px] items-center px-5">

        <h4 className="text-[15px] font-medium text-[#202020]">
          {row}
        </h4>

      </div>

      {/* Instagram */}

      <Cell
        row={row}
        platform="instagram"
        selection={selection}
        setSelection={setSelection}
      />

      {/* Facebook */}

      <Cell
        row={row}
        platform="facebook"
        selection={selection}
        setSelection={setSelection}
      />

      {/* Youtube */}

      <Cell
        row={row}
        platform="youtube"
        selection={selection}
        setSelection={setSelection}
      />

      {/* Pinterest */}

      <Cell
        row={row}
        platform="pinterest"
        selection={selection}
        setSelection={setSelection}
      />

      {/* Linkedin */}

      <Cell
        row={row}
        platform="linkedin"
        selection={selection}
        setSelection={setSelection}
      />

    </div>

  ))}

{/* =====================================================
          SELECT MONTHS
===================================================== */}

<div className="border-t border-[#E7CF99] bg-[#FCEBC5] px-8 py-6">

  <div className="flex items-center justify-between">

    <div>

      <h3 className="text-[18px] font-bold text-[#202020]">
        Select Months
      </h3>

      <p className="mt-1 text-[13px] text-[#202020]">
        Choose campaign duration.
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
          setMonths(Math.max(1, months - 1))
        }
        className="
          h-11
          w-11
          text-[22px]
          font-bold
          transition-all
          hover:bg-[#F7D38A]
        "
      >
        −
      </button>

      <span className="w-12 text-center text-[16px] font-bold">
        {months}
      </span>

      <button
        onClick={() =>
          setMonths(months + 1)
        }
        className="
          h-11
          w-11
          text-[22px]
          font-bold
          transition-all
          hover:bg-[#F7D38A]
        "
      >
        +
      </button>

    </div>

  </div>

</div>

</div>



{/* Temporary Debug */}

<pre className="hidden">
  {JSON.stringify(
    {
      selectedItems,
      months,
    },
    null,
    2
  )}
</pre>


    </div>

  );
}