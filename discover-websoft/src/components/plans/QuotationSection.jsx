export default function QuotationSection({
  children,
  summary,
}) {
  return (
    <section className="relative bg-[#FDF6E8] py-[90px] overflow-hidden">

      {/* Background Bubbles */}
      <div className="absolute left-[60px] top-[100px] h-[120px] w-[120px] rounded-full bg-[#F5A623]/10 blur-sm"></div>

      <div className="absolute right-[120px] top-[60px] h-[20px] w-[20px] rounded-full bg-[#F5A623]/40"></div>

      <div className="absolute left-[45%] top-[150px] h-[12px] w-[12px] rounded-full bg-[#F5A623]/50"></div>

      <div className="mx-auto max-w-[1440px] px-10">

        {/* Heading */}

        <div className="text-center">

          <h2 className="text-[58px] font-extrabold leading-none">

            <span className="text-[#202020]">
              Get Customised
            </span>{" "}

            <span className="text-[#F5A623]">
              Quotation
            </span>

          </h2>

          <p className="mt-4 text-[17px] text-[#202020]">

            Receive a personalized cost estimate based on your project requirements.

          </p>

        </div>

        {/* Layout */}

        <div className="mt-16 flex items-start gap-10">

          {/* Left */}

          <div className="flex-1">

            {children}

          </div>

          {/* Right */}

          <div className="w-[360px] shrink-0">

            {summary}

          </div>

        </div>

      </div>

    </section>
  );
}