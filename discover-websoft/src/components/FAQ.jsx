import { useState } from "react";

export default function FAQ({
  faqData,
  bubbleBg,
  headingBg,
  girlImg,
  faqOpenIcon,
  faqCloseIcon,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* ==========================================================
          FAQ SECTION
      =========================================================== */}
      <section
  className="relative overflow-hidden bg-[#FDF6E8] pt-[175px] pb-[110px]"
        style={{
          backgroundImage: `url(${bubbleBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto max-w-[1396px] px-6">
          <div className="relative text-center">
            <img
              src={headingBg}
              alt=""
              draggable="false"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                w-[980px]
                -translate-x-1/2
                -translate-y-1/2
                select-none
              "
            />
            <div className="relative z-10">
              <h2 className="text-[52px] font-extrabold leading-none text-[#202020]">
                Frequently{" "}
                <span className="text-[#F5A623]">Asked Questions</span>
              </h2>
             <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-[28px] text-[#202020]">
                Discover how our services have helped businesses grow through
                real experiences, success stories, and client feedback.
              </p>
            </div>
          </div>

      <div className="mt-[52px] flex items-start gap-[100px]">
         <div className="-ml-[175px] mt-[6px] flex w-[395px] shrink-0 items-end">
              <img
                src={girlImg}
                alt="FAQ Girl"
                draggable="false"
                className="w-[355px] max-w-none object-contain select-none"
              />
            </div>

           <div className="mt-[28px] w-[870px]">
              <div className="space-y-6">
                {faqData.map((faq, index) => {
                  const isOpen = openIndex === index;

                const cardOffset = [
  "mr-[30px]",
  "ml-[42px]",
  "mr-[30px]",
  "ml-[42px]",
  "mr-[30px]",
];

                  return (
                    <div
                      key={faq.id}
                      className={`${cardOffset[index]} transition-all duration-300`}
                    >
                      <div
                        className="
                          overflow-hidden
                          rounded-[18px]
                          border
                          border-[#F3D08A]
                          bg-gradient-to-r
                          from-[#FFE7B2]
                          to-[#FFD78D]
                          shadow-[0_8px_18px_rgba(0,0,0,.08)]
                        "
                      >
                        {/* Question */}
                        <button
                          onClick={() => setOpenIndex(isOpen ? -1 : index)}
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                           px-[28px] py-[24px] text-left">
                          <span className="text-[18px] leading-[26px] font-medium font-medium text-[#202020]">
                            {faq.question}
                          </span>
                          <img
                            src={isOpen ? faqOpenIcon : faqCloseIcon}
                            alt=""
                            className="h-5 w-5 shrink-0"
                          />
                        </button>

                        {/* Answer */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isOpen ? "max-h-[320px]" : "max-h-0"
                          }`}
                        >
                         <div className="border-t border-[#F2D08E] px-[28px] py-[22px]">
                            <p className="text-[15px] leading-[28px]
text-[#5B5B5B]">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
