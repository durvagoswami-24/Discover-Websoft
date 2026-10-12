// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE — src/pages/Home.jsx
// Sections: Hero → Core Services → (Why Choose Us) → (Testimonials) → (Contact)
// ═══════════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from "react";
import heroBg from "../assets/hero-bg.png";
import heroImg from "../assets/hero-img.png";
import servicesBg from "../assets/bg.png";
import serviceBg from "../assets/service-bg.png";
import whyBg from "../assets/why-choose-bg.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
import bubbleBg from "../assets/bubble.png";
import headingBg from "../assets/heading-bg.png";5
import testimonialBg from "../assets/testimonial.png";
import user1 from "../assets/user1.png";
import statisticsBg from "../assets/bg.png";
import girlImg from "../assets/faq.png";
import faqOpenIcon from "../assets/faq-icon1.png";
import faqCloseIcon from "../assets/faq-icon.png";
import { HiStar } from "react-icons/hi";
import {
  HiOutlineGlobe,
  HiOutlineSearchCircle,
  HiOutlineSpeakerphone,
  HiOutlineShoppingCart,
  HiOutlineColorSwatch,
} from "react-icons/hi";

import {
  HiArrowRight,
  HiPhone,
} from "react-icons/hi";
import webIcon from "../assets/service-icon1.png";
import seoIcon from "../assets/service-icon2.png";
import marketingIcon from "../assets/service-icon3.png";
import ecommerceIcon from "../assets/service-icon4.png";
import graphicIcon from "../assets/service-icon5.png";

import FAQ from "../components/FAQ";
// ═══════════════════════════════════════════════════════════════════════════════
// DATA — SERVICES
// ═══════════════════════════════════════════════════════════════════════════════

const services = [
  {
    id: 1,
    number: "01",
    icon: webIcon,
    title: "Web & App Design",
    description:
      "Crafting high-performance, visually stunning websites tailored to engage your audience and drive conversions with seamless UX.",
  },
  {
    id: 2,
    number: "02",
    icon: seoIcon,
    title: "SEO Services",
    description:
      "Data-driven optimization strategies designed to elevate your search rankings, increase organic traffic, and boost digital visibility.",
  },
  {
    id: 3,
    number: "03",
    icon: marketingIcon,
    title: "Digital Marketing",
    description:
      "Comprehensive digital campaigns across social, email, and paid channels to amplify brand voice and maximize ROI.",
  },
  {
    id: 4,
    number: "04",
    icon: ecommerceIcon,
    title: "E-commerce Solutions",
    description:
      "Robust, secure, and highly converting online storefronts tailored to streamline your sales operations and enhance shopper experience.",
  },
  {
    id: 5,
    number: "05",
    icon: graphicIcon,
    title: "Graphic Designing",
    description:
      "Striking visual identities, compelling marketing collateral, and thoughtful UI/UX assets that resonate with your target audience.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DATA — WHY CHOOSE US
// ═══════════════════════════════════════════════════════════════════════════════

const leftFeatures = [
  { id: 1, title: "Modern UI/UX", icon: icon1 },
  { id: 2, title: "SEO Friendly", icon: icon2 },
  { id: 3, title: "Affordable Packages", icon: icon3 },
];

const rightFeatures = [
  { id: 4, title: "Mobile Responsive", icon: icon4 },
  { id: 5, title: "24/7 Support", icon: icon5 },
  { id: 6, title: "Fast Performance", icon: icon6 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DATA — TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════════

const testimonials = [
  {
    id: 1,
    name: "Rajesh S.",
    image: user1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    rating: 4,
  },
  {
    id: 2,
    name: "Rajesh S.",
    image: user1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rajesh S.",
    image: user1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    rating: 4,
  },
  {
    id: 4,
    name: "Rajesh S.",
    image: user1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    rating: 4,
  },
];
// ═══════════════════════════════════════════════════════════════════════
// DATA — STATISTICS
// ═══════════════════════════════════════════════════════════════════════

const statistics = [
  { id: 1, number: 1500, suffix: "+", title: "Happy Client" },
  { id: 2, number: 25, suffix: "+", title: "Team Members" },
  { id: 3, number: 100, suffix: "+", title: "Number of services" },
  { id: 4, number: 15, suffix: "+", title: "Years of Experience" },
];

const faqData = [
  {
    id: 1,
    question: "How much does website development cost in India?",
    answer:
      "Website development cost in India depends on the type of website, number of pages, features, and functionality required. A basic business website generally costs less than an advanced custom or ecommerce website.",
  },
  {
    id: 2,
    question: "How can I get an instant project quote?",
    answer:
      "Simply contact our team through the enquiry form or WhatsApp. We'll understand your requirements and provide a detailed quotation.",
  },
  {
    id: 3,
    question: "How much does an ecommerce website cost?",
    answer:
      "The cost depends on the number of products, payment gateway integration, custom features, admin panel requirements, and design complexity.",
  },
  {
    id: 4,
    question: "Is WordPress website development affordable?",
    answer:
      "Yes. WordPress is one of the most cost-effective CMS platforms and is suitable for business websites, blogs, and portfolio websites.",
  },
  {
    id: 5,
    question: "How can I estimate the cost of digital services?",
    answer:
      "You can share your project details with us and we'll provide a transparent estimate based on your goals, timeline, and required features.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 01 — HERO
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-16">
        <div className="flex min-h-[calc(100vh-88px)] items-center justify-between gap-10">

          {/* ── Left Content ── */}
          <div className="w-[40%] shrink-0">

            <h1 className="text-[64px] font-extrabold leading-[72px] text-[#1B1B1B]">
              Web & App
              <br />
              Design
            </h1>

            <div className="mt-6 h-[3px] w-14 rounded-full bg-[#F5B041]" />

            <p className="mt-6 text-[22px] font-medium leading-[34px] text-[#3E3E3E]">
              Creating Seamless
              <br />
              Digital Experiences
            </p>

            <button className="mt-10 rounded-full bg-[#252120] px-9 py-4 text-[15px] font-semibold uppercase tracking-widest text-white transition duration-300 hover:bg-[#F5B041] hover:text-black">
              GET A QUOTE →
            </button>

          </div>

          {/* ── Right Image ── */}
          <div className="w-[60%] shrink-0">
            <img
              src={heroImg}
              alt="Web & App Design Showcase"
              className="w-full object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 02 — CORE SERVICES
// ═══════════════════════════════════════════════════════════════════════════════

function ServiceCard({ service }) {
  return (
    <div
      className="
        group
        relative
        translate-y-2
        h-[335px]
w-[252px]
        transition-all
        duration-500
        hover:-translate-y-2
      "
    >
      {/* Background */}
      <img
        src={serviceBg}
        alt=""
        draggable="false"
        className="
          absolute
          inset-0
          h-full
          w-full
          select-none
         object-fill
rounded-[24px]
scale-[1.02]
          shadow-[0_10px_25px_rgba(0,0,0,.08)]
          transition-shadow
          duration-500
          group-hover:shadow-[0_16px_32px_rgba(0,0,0,.12)]
        "
      />

      {/* Card Number */}
      <span
        className="
          absolute
          left-5
          top-4
          z-20
          text-[30px]
          font-extrabold
          leading-none
          text-[#FF9800]
        "
      >
        {service.number}
      </span>

      {/* Glass Inner Card */}
      <div
        className="
          absolute
          left-1/2
          top-[52px]
          flex
          h-[265px]
          w-[214px]
          -translate-x-1/2
          flex-col
          items-center
          rounded-[22px]
          border
          border-white
          bg-[#FFD992]/90
         px-6
pt-7
          text-center
          shadow-[0_4px_10px_rgba(0,0,0,.06)]
          backdrop-blur-sm
        "
      >
        <div className="relative">
          <img
            src={service.icon}
            alt={service.title}
            className="h-10 w-10 object-contain"
          />
          <div
            className="
              mx-auto
              mt-2
              h-[8px]
              w-[48px]
              rounded-full
              bg-black/10
              blur-[2px]
            "
          />
        </div>

        <h3
          className="
            mt-4
            flex
            min-h-[58px]
            items-center
            justify-center
            text-center
            text-[18px]
            leading-[24px]
            font-extrabold
            text-[#202020]
            transition-colors
            duration-300
            group-hover:text-[#111111]
          "
        >
          {service.title}
        </h3>

        <p
          className="
            // mt-1
           w-[194px]
text-[12px]
leading-[20px]
font-medium
            text-center
          
           text-[#202020]
          "
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}

function CoreServicesSection() {
  return (
    <section
      className="relative overflow-hidden pt-[105px]
pb-[110px]"
      style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto max-w-[1520px] px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            className="
              text-[56px]
              font-extrabold
              leading-[100%]
              text-[#202020]
            "
          >
            Our <span className="text-[#F5A623]">Core Services</span>
          </h2>
          <p
            className="
              mx-auto
              mt-7
              max-w-[620px]
              text-[17px]
              leading-[30px]
              font-normal
              text-[#202020]
            "
          >
            We provide innovative and result-driven solutions to help
            businesses grow, strengthen their brand presence, and achieve
            their digital goals effectively.
          </p>
        </div>

        <div
          className="
            mt-[72px]
            flex
            flex-wrap
            items-start
            justify-center
            gap-8
          "
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Decorative Blur Bubbles */}
      <div className="pointer-events-none absolute left-[4%] top-[12%] h-4 w-4 rounded-full bg-[#FFD68A] opacity-40" />
      <div className="pointer-events-none absolute right-[6%] top-[6%] h-24 w-24 rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-50 blur-[1px]" />
      <div className="pointer-events-none absolute bottom-[8%] left-[3%] h-10 w-10 rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-30" />
      <div className="pointer-events-none absolute bottom-[6%] right-[8%] h-32 w-32 rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-25" />
    </section>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 03 — WHY CHOOSE US
// ═══════════════════════════════════════════════════════════════════════════════

function WhyChooseUsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".fade-item");
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: `url(${whyBg})` }}
    >
      <style>{`
        .fade-item {
          opacity: 0;
          transform: translateY(40px);
          transition: all .8s cubic-bezier(.22,.61,.36,1);
        }
        .fade-item.show {
          opacity: 1;
          transform: translateY(0);
        }
        .feature {
          transition: all .35s ease;
        }
        .feature:hover {
          transform: translateX(12px);
        }
        .feature-icon-badge {
          transition: .4s;
        }
        .feature:hover .feature-icon-badge {
          transform: scale(1.08) rotate(-6deg);
        }
        @keyframes floating {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .floating {
          animation: floating 4s ease-in-out infinite;
        }
        .left-column .feature:nth-child(2) .floating { animation-delay: .4s; }
        .left-column .feature:nth-child(3) .floating { animation-delay: .8s; }
        .right-column .feature:nth-child(2) .floating { animation-delay: .5s; }
        .right-column .feature:nth-child(3) .floating { animation-delay: 1s; }
      `}</style>

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-10 ">
        <div className="fade-item text-center">
          <h2 className="text-[56px] font-extrabold leading-none tracking-[-1px] text-[#202020]">
            Why Choose <span className="text-[#F5A623]">Us</span>
          </h2>
          <p className="mx-auto mt-6 max-w-300 text-[18px] leading-8 text-[#000000]">
            We deliver creative, user-focused, and result-driven solutions that
            help businesses grow. Our commitment to quality, innovation, and
            customer satisfaction ensures every project exceeds expectations.
          </p>
        </div>

{/* Decorative Bubbles */}

<div className="pointer-events-none absolute left-[3%] top-[10%] h-5 w-5 rounded-full bg-[#FFD68A] opacity-70" />

<div className="pointer-events-none absolute left-[-70px] bottom-[8%] h-[220px] w-[220px] rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-45 blur-[1px]" />

<div className="pointer-events-none absolute right-[6%] top-[8%] h-[120px] w-[120px] rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-80" />

<div className="pointer-events-none absolute right-[12%] bottom-[6%] h-[180px] w-[180px] rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-35" />

<div className="pointer-events-none absolute left-[22%] top-[18%] h-3 w-3 rounded-full bg-[#FFD68A] opacity-70" />

<div className="pointer-events-none absolute right-[30%] top-[22%] h-4 w-4 rounded-full bg-[#FFD68A] opacity-60" />


        <div className="mt-16 flex items-center justify-between">
          <div className="left-column flex w-[42%] flex-col gap-10">
            {leftFeatures.map((item) => (
              <div key={item.id} className="feature fade-item flex items-center gap-6">
                <div className="feature-icon-badge floating flex shrink-0 items-center justify-center ">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-18 w-20 object-contain select-none"
                    draggable="false"
                  />
                </div>
                <h3 className="text-[28px] font-medium text-[#262626]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

<div className="hidden h-[270px] w-px bg-[#F5B041]/60 lg:block"></div>


          <div className="right-column flex w-[42%] flex-col gap-10">
            {rightFeatures.map((item) => (
              <div key={item.id} className="feature fade-item flex items-center gap-6">
                <div className="feature-icon-badge floating flex h-[64px] w-[64px] shrink-0 items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-18 w-20 object-contain select-none"
                    draggable="false"
                  />
                </div>
                <h3 className="text-[28px] font-medium text-[#262626]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 04 — TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════════

function TestimonialsSection() {
  return (
    <section
  className="relative overflow-hidden bg-[#FCEFD8] py-24"
  style={{
    backgroundImage: `url(${bubbleBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
>
      <style>{`
        .testimonial-card {
          transition: all .45s cubic-bezier(.22,.61,.36,1);
        }
        .testimonial-card:hover {
          transform: translateY(-10px);
        }
        .orange-layer {
          transition: transform .45s ease;
        }
        .group:hover .orange-layer {
          transform: rotate(10deg);
        }
        .gloss-top,
.gloss-bottom{
    position:absolute;
    background:rgba(255,255,255,.85);
    filter:blur(2px);
    border-radius:9999px;
}

.gloss-top{
    width:72px;
    height:72px;
    right:-30px;
    top:-30px;
}

.gloss-bottom{
    width:72px;
    height:92px;
    right:-25px;
    bottom:-35px;
}
      `}</style>


      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* ── Heading ── */}
       <div className="relative mb-16 text-center">

  {/* Decorative Background */}
  <img
    src={headingBg}
    alt=""
    className="pointer-events-none absolute left-1/2 top-1/2 w-[1050px] -translate-x-1/2 -translate-y-1/2 select-none"
    draggable="false"
  />

  {/* Heading Content */}
  <div className="relative z-10">
    <h2 className="text-[48px] font-extrabold leading-tight text-[#1B1B1B]">
      What our <span className="text-[#F5A623]">Clients Say</span>
    </h2>

    <p className="mx-auto mt-4 max-w-[620px] text-[16px] leading-[28px] text-[#202020]">
      Discover how our services have helped businesses grow through real
      experiences, success stories, and client feedback.
    </p>
  </div>

</div>

        {/* ── Testimonial Cards ── */}
        <div className="mt-20 grid grid-cols-1 justify-items-center gap-x-20 gap-y-16 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((item) => (
            <div key={item.id} className="group relative flex justify-center">
              {/* Orange back layer */}
              <div className="orange-layer absolute top-5 size-[250px] rotate-18 rounded-[20px] bg-[#F5A623] shadow-[0_18px_30px_rgba(245,166,35,.28)]" />

              {/* Glass front card */}
           <div
  className="testimonial-card relative z-10 h-[295px] w-[250px] overflow-hidden rounded-[20px] border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.12)] backdrop-blur-[18px]"
  style={{
    background: "rgba(255,255,255,0.16)",
  }}
>
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 pointer-events-none"></div>

             {/* Glass Overlay */}
<div
  className="absolute inset-0 rounded-[20px] pointer-events-none"
  style={{
    background: `
      linear-gradient(
        145deg,
        rgba(255,255,255,.35) 0%,
        rgba(255,255,255,.15) 35%,
        rgba(255,255,255,.08) 65%,
        rgba(255,255,255,.18) 100%
      )
    `,
  }}
></div>

<div
  className="absolute inset-0 rounded-[20px] pointer-events-none"
  style={{
    boxShadow: "inset 0 1px 1px rgba(255,255,255,.45)",
  }}
></div>
                <span className="gloss-top"></span>
                <span className="gloss-bottom"></span>

{/* CONTENT */}
    <div className="relative z-10">

                {/* Stars */}
                <div className="flex gap-1 px-6 pt-5">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className={`text-[18px] ${
                        i < item.rating ? "text-[#F5A623]" : "text-[#C9C9C9]"
                      }`}
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="mx-auto w-[82%] pt-4 text-[13px] leading-[24px] text-[#343434]">
                  {item.review}
                </p>

                {/* Divider */}
                <div className="mt-7 border-t border-[#EAEAEA]" />

                {/* User */}
                <div className="flex items-center gap-3 px-6 py-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <h4 className="text-[14px] font-semibold text-[#202020]">
                    {item.name}
                  </h4>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 05 — STATISTICS + FAQ
// Rebuilt from Figma
// ═══════════════════════════════════════════════════════════════════════
function StatisticsFaqSection() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const hasAnimated = useRef(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        statistics.forEach((item, index) => {
          let current = 0;
          const duration = 1800;
          const increment = item.number / (duration / 16);
          const timer = setInterval(() => {
            current += increment;
            if (current >= item.number) {
              current = item.number;
              clearInterval(timer);
            }
            setCounts((prev) => {
              const updated = [...prev];
              updated[index] = Math.floor(current);
              return updated;
            });
          }, 16);
        });
      },
      {
        threshold: 0.35,
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
     {/* ==========================================================
          STATISTICS
      =========================================================== */}
      <section
        ref={sectionRef}
        className="relative h-[385px] overflow-visible"
      >
        {/* Top Background Area */}
        <div className="absolute top-0 left-0 h-[300px] w-full bg-[#FCE6BE]" />

        {/* Bottom Background Area */}
        <div className="absolute bottom-0 left-0 h-[85px] w-full bg-[#FDF6E8]" />

        {/* Bubble Background Image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${bubbleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Decorative Bubbles */}
        <div className="absolute left-[3%] top-[14%] h-5 w-5 rounded-full bg-[#F7C96F]" />
        <div className="absolute left-[18%] top-[8%] h-[90px] w-[90px] rounded-full bg-gradient-to-br from-white via-[#FFE5AE] to-[#F8C86D] opacity-70 blur-[1px]" />
        <div className="absolute left-[52%] top-[18%] h-4 w-4 rounded-full bg-[#F7C96F]" />
        <div className="absolute right-[15%] top-[22%] h-4 w-4 rounded-full bg-[#F7C96F]" />
        <div className="absolute left-[70%] bottom-[8%] h-[120px] w-[120px] rounded-full bg-gradient-to-br from-white via-[#FFE5AE] to-[#F8C86D] opacity-35" />

       <div className="relative z-20 mx-auto max-w-[1320px]">
          {/* Heading */}
          <div className="pt-[52px] text-center">
            <h2 className="text-[52px] leading-none font-extrabold text-[#202020]">
              Our <span className="text-[#F5A623]">Statistics</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[32px] text-[#202020]">
              Numbers that reflect our growth, achievements, and the trust our
              clients place in us. Explore the milestones that showcase our
              success and commitment to excellence.
            </p>
          </div>

          {/* Statistics Cards */}
          <div
            className="
              absolute
              left-1/2
              bottom-[-180px]
              z-30
              grid
              w-full
              max-w-[1320px]
              -translate-x-1/2
              grid-cols-4
              justify-items-center
              gap-[26px]
            "
          >
            {statistics.map((item, index) => (
              <div
                key={item.id}
                className="
                  group
                  relative
                  h-[140px]
                  w-[214px]
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-white
                  shadow-[0_10px_24px_rgba(0,0,0,.12)]
                  transition-transform
                  duration-300
                  hover:-translate-y-[6px]
                "
              >
                {/* Layer 1 + Layer 2 — dual tone base */}
                <div className="absolute inset-0 overflow-hidden rounded-[22px]">
                  <div className="absolute inset-x-0 top-0 h-[56%] bg-[#F8CF83]" />
                  <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[#FFE5AF]" />
                  {/* Layer 3 — glossy overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,.20), rgba(255,255,255,.05), transparent)",
                    }}
                  />
                </div>

                {/* Layer 4 — Inset White Border */}
                <div
                  className="absolute inset-0 rounded-[22px]"
                  style={{
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,.45)",
                  }}
                />

                {/* Layer 5 — Soft Top Glow */}
                <div
                  className="absolute -top-6 left-1/2 h-[70px] w-[140px] -translate-x-1/2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,.22)",
                    filter: "blur(18px)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-5 pt-[18px] pb-[18px] text-center">
                  <h3 className="text-[56px] font-extrabold leading-none tracking-[-1px] text-black">
                    {counts[index].toLocaleString()}
                    {item.suffix}
                  </h3>
                  <p className="mt-[10px] text-[16px] font-medium text-[#202020]">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================
          FAQ SECTION
      =========================================================== */}
      <FAQ
  faqData={faqData}
  bubbleBg={bubbleBg}
  headingBg={headingBg}
  girlImg={girlImg}
  faqOpenIcon={faqOpenIcon}
  faqCloseIcon={faqCloseIcon}
/>
    </>
  );
}


// ═══════════════════════════════════════════════════════════════════════
// SECTION 06 — READY TO BUILD
// ═══════════════════════════════════════════════════════════════════════
function ReadyToBuildSection() {
  return (
    <section
      className="relative overflow-hidden border border-white"
      style={{
        height: "541px",
        backgroundColor: "#FCE6BE",
        backgroundImage: `url(${bubbleBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-center px-6">
       <div className="flex w-full max-w-[900px] flex-col items-center text-center">
          <h2
  className="
    max-w-[883px]
    text-center
    text-[66px]
    font-extrabold
    leading-[72px]
    tracking-[-1.2px]
    text-[#202020]
  "
>
  Ready to Build Your{" "}
  <span className="text-[#F5A623]">
    Next Big Idea?
  </span>
</h2>
          <p
            className="
            mt-8
max-w-[700px]
text-[16px]
leading-[30px]
font-normal
text-[#676767]
            "
          >
            Partner with Discover Websoft to transform your vision into a
            scalable, high performance digital reality. Our engineering elite
            is ready to architect your success.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <button
              className="
                group
                flex
                h-[58px]
                w-[180px]
                items-center
                justify-center
                gap-2
                rounded-[10px]
                bg-[#1F1F2B]
                text-[17px]
                font-semibold
                text-white
                shadow-[0_10px_24px_rgba(0,0,0,.18)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#2A2A38]
              "
            >
              Contact Us
              <HiArrowRight
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
            <button
              className="
                flex
                h-[58px]
                w-[180px]
                items-center
                justify-center
                rounded-[10px]
                border
                border-[#E7C884]
                bg-transparent
                text-[17px]
                font-semibold
                text-[#202020]
                transition-all
                duration-300
                hover:bg-white/40
                hover:border-[#F5A623]
              "
            >
              Book Free Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// PAGE ASSEMBLY — add new sections here as you build them
// ═══════════════════════════════════════════════════════════════════════════════

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CoreServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <StatisticsFaqSection />
      
    </main>
  );
};

export default Home;