import { Link } from "react-router-dom";

export default function CTABanner({
  heading = "Have an idea?",
  highlight = "Let's turn it into reality.",
  subtext = "",
  buttonText = "Inquiry Now",
  buttonLink = "/contact",
}) {
  return (
    <section className="bg-[#FBE4A6] py-20">
      <div className="mx-auto max-w-[900px] px-6 text-center">

        <h2 className="text-[32px] font-bold leading-[42px] text-[#202020] md:text-[38px]">
          {heading}{" "}
          <span className="text-[#F5A623]">{highlight}</span>
        </h2>

        {subtext && (
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[24px] text-[#202020]">
            {subtext}
          </p>
        )}

        <Link
          to={buttonLink}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-[12px]
            bg-[#202020]
            px-8
            py-4
            text-[14px]
            font-bold
            tracking-[1px]
            text-[#F5C15C]
            transition-all
            duration-300
            hover:bg-black
          "
        >
          {buttonText} →
        </Link>

      </div>
    </section>
  );
}
