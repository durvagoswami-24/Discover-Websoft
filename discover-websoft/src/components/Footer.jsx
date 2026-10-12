import { Link } from "react-router-dom";
import logo from "../assets/DWS LOGO PNG.png";
import {
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import {
  FaGlobe,
  FaShareAlt,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Plans", path: "/plans" },
  { name: "Blog", path: "/blog" },
  { name: "Contact us", path: "/contact" },
];

const services = [
  "Web & App Design",
  "Seo Services",
  "Digital Marketing",
  "E-commerce Solutions",
  "Graphic Designing",
];

export default function Footer() {
  return (
    <footer className="bg-[#23232D] text-white">
     <div className="mx-auto max-w-[1280px] px-5 pt-14 pb-8">
        <div className="grid grid-cols-[240px_1fr] gap-24">
          {/* Logo column */}
          <div>
            <img
              src={logo}
              alt="Discover Websoft"
              className="h-auto w-[150px]"
            />
            <p
              className="
                mt-8
               max-w-[185px] text-[13px] leading-[24px]
text-white/55"
            >
              Empowering businesses with cutting-edge digital solutions.
              We blend aesthetics with robust functionality to elevate your
              brand's digital presence globally.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <button
                className="
                  transition
                  hover:text-[#F5A623]
                "
              >
                <FaGlobe />
              </button>
              <button
                className="
                  transition
                  hover:text-[#F5A623]
                "
              >
                <FaShareAlt />
              </button>
              <button
                className="
                  transition
                  hover:text-[#F5A623]
                "
              >
                <HiOutlineMail />
              </button>
            </div>
          </div>

          {/* Links grid */}
          <div
            className="
              grid
              grid-cols-3
             gap-12
            "
          >
            <div>
              <h3 className="text-[15px]
tracking-[1.2px]
font-bold  uppercase  text-[#F5D38A]">
                Quick Links
              </h3>
              <div className="mt-3 h-px w-full bg-[#6A5A3A]" />
              <ul className="mt-8 space-y-4">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="
                        text-[15px]
                        text-white/75
                        transition-all
                        duration-300
                        hover:text-[#F5A623]
                        leading-[24px]
                      "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[15px]
tracking-[1.2px]
font-bold  uppercase  text-[#F5D38A]">
                Services
              </h3>
              <div className="mt-3 h-px w-full bg-[#6A5A3A]" />
              <ul className="mt-8 space-y-4">
                {services.map((item) => (
                  <li key={item}>
                    <span
                      className="
                        text-[15px]
                        text-white/75
                        transition
                        duration-300
                        hover:text-[#F5A623]
                        leading-[24px]
                      "
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[15px]
tracking-[1.2px]
font-bold  uppercase  text-[#F5D38A]">
                Get In Touch
              </h3>
              <div className="mt-3 h-px w-full bg-[#6A5A3A]" />
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <HiOutlineLocationMarker
                    className="mt-1 text-[20px] text-white/70"
                  />
                  <div>
                    <h4 className="text-[15px]
font-semibold">
                      Headquarters
                    </h4>
                    <p className="mt-3 text-[13px]
leading-[24px]
text-white/60">
                      702-7th Floor,
                      <br />
                      Shagun Arcade,
                      Vijay Nagar,
                      Indore,
                      <br />
                      Madhya Pradesh 452010
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HiOutlineOfficeBuilding
                    className="mt-1 text-[20px] text-white/70"
                  />
                  <div>
                    <h4 className="text-[15px] font-semibold">
                      Branch Office
                    </h4>
                    <p className="mt-3 text-[13px] leading-[24px] text-white/60">
                      125-F,
                      near Mahalaxmi Nagar,
                      <br />
                      Scheme 134,
                      Nipania,
                      Indore,
                      <br />
                      Madhya Pradesh 452010
                    </p>
                  </div>
                  </div>
<div className="flex items-start gap-4">
  <HiOutlinePhone className="mt-1 text-[16px] text-white/70" />

  <div className="space-y-1">
    <a
      href="tel:+917489963385"
      className="block text-[13px] leading-[22px] text-white/60 hover:text-[#F5A623]"
    >
      +91 74899-63385
    </a>

    <a
      href="tel:+919589708420"
      className="block text-[13px] leading-[22px] text-white/60 hover:text-[#F5A623]"
    >
      +91 95897-08420
    </a>
  </div>
</div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-12 border-t border-white/10"></div>
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-[12px]
              text-white/35
            "
          >
            © 2026 Discover Websoft. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="
                text-[12px]
                text-white/35
                transition
                duration-300
                hover:text-[#F5A623]
              "
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="
                text-[12px]
                text-white/35
                transition
                duration-300
                hover:text-[#F5A623]
              "
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}