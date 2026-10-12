import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiChevronRight,
  HiSearch,
  HiChevronDown,
  HiFilter,
  HiStar,
} from "react-icons/hi";


import FAQ from "../components/FAQ";
// FAQ assets (reused from Home.jsx)
import bubbleBg from "../assets/bubble.png";
import headingBg from "../assets/heading-bg.png";
import girlImg from "../assets/faq.png";
import faqOpenIcon from "../assets/faq-icon1.png";
import faqCloseIcon from "../assets/faq-icon.png";
import { services } from "../data/services";
import FilterSidebar from "../components/FilterSidebar";


// List of categories shown in the sidebar filter checkboxes
const categories = [
  "All Services",
  "Website Designing",
  "Website Development",
  "Ecommerce Development",
  "Website Maintenance",
  "Social Media Marketing",
  "Graphic Designing",
  "Video Editing",
  "App Development",
  "SEO",
  "Branding",
];

// ==========================================================
// FAQ DATA — specific to the Shop page
// ==========================================================
const faqData = [
  {
    id: 1,
    question: "What services are available on this platform?",
    answer:
      "We offer a wide range of digital services, including Website Designing, Website Development, E-commerce Development, WordPress Website Development, Social Media Marketing, SEO, App Development, Video Editing, Graphic Designing, and Branding.",
  },
  {
    id: 2,
    question: "How can I find the service that best fits my business needs?",
    answer:
      "Use the search bar or category filters in the sidebar to narrow down services by type, then compare the available plans on each service card to see which matches your requirements and budget.",
  },
  {
    id: 3,
    question: "Are different pricing plans available for each service?",
    answer:
      "Yes. Most services offer multiple plans with different features and pricing tiers, so you can choose the option that best fits your project scope and budget.",
  },
  {
    id: 4,
    question:
      "Can I request a customized package instead of selecting a standard plan?",
    answer:
      "Absolutely. If none of the listed plans fit your exact needs, you can reach out to our team and we'll put together a custom package tailored to your project.",
  },
  {
    id: 5,
    question: "What information do I need to provide before starting a project?",
    answer:
      "Generally we'll need your business goals, preferred timeline, budget range, and any existing brand assets or references so we can scope the work accurately from the start.",
  },
];

// ==========================================================
// DECORATIVE BUBBLES
// Individually positioned circles replacing the old tiled
// bubble.png background, matching the discrete dots/blur
// circles visible in the Figma frame.
// ==========================================================
function DecorativeBubbles() {
  return (
    <>
      {/* Large soft circle, top right, partially cropped by viewport edge */}
      <div className="pointer-events-none absolute -right-10 top-[2%] h-[220px] w-[220px] rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-50 blur-[1px]" />

      {/* Small solid dot near top right, inside the results-count row */}
      <div className="pointer-events-none absolute right-[4%] top-[24%] h-3 w-3 rounded-full bg-[#F7C96F]" />

      {/* Half-circle sliver on the far left edge, level with sidebar */}
      <div className="pointer-events-none absolute -left-16 bottom-[18%] h-[180px] w-[180px] rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-40" />

      {/* Small dot, left edge, upper area */}
      <div className="pointer-events-none absolute left-[2%] top-[8%] h-4 w-4 rounded-full bg-[#FFD68A] opacity-70" />

      {/* Large soft circle, bottom right, partially cropped */}
      <div className="pointer-events-none absolute -right-16 bottom-[4%] h-[260px] w-[260px] rounded-full bg-gradient-to-br from-white via-[#FFE4AE] to-[#FFC75A] opacity-30" />

      {/* Small solid dot, mid right, between rows */}
      <div className="pointer-events-none absolute right-[2%] top-[46%] h-3 w-3 rounded-full bg-[#F7C96F]" />

      {/* Small solid dot, bottom right near sidebar apply button height */}
      <div className="pointer-events-none absolute right-[24%] bottom-[6%] h-3 w-3 rounded-full bg-[#F7C96F]" />
    </>
  );
}

export default function Shop() {
  console.log(services);
  // ==========================================================
  // STATE
  // ==========================================================
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "All Services",
  ]);
  const [price, setPrice] = useState(1000000);


  // Handles checkbox toggling logic for category filters
  const toggleCategory = (category) => {
    // Clicking "All Services" resets to only that selection
    if (category === "All Services") {
      setSelectedCategories(["All Services"]);
      return;
    }

    let updated = [...selectedCategories];
    updated = updated.filter((item) => item !== "All Services");

    if (updated.includes(category)) {
      updated = updated.filter((item) => item !== category);
    } else {
      updated.push(category);
    }

    // If nothing is selected, fall back to "All Services"
    if (updated.length === 0) {
      updated = ["All Services"];
    }

    setSelectedCategories(updated);
  };

  // Filters the services list based on search text, selected categories, and price
 const filteredServices = services.filter((service) => {
  console.log(service.title, service.category, service.price);

  const matchesSearch = service.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    selectedCategories.includes("All Services") ||
    selectedCategories.includes(service.category);

  const matchesPrice = service.price <= price;

  return matchesSearch && matchesCategory && matchesPrice;
});
  return (
    <>
      {/* ==========================================================
            SHOP HERO SECTION
      =========================================================== */}
      <section className="relative bg-[#FDF6E8] pt-[58px] pb-[42px]">
        {/* Bubbles isolated in their own clipping wrapper — keeping
            overflow-hidden off the <section> itself avoids breaking
            position:sticky on the sidebar further down the page. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <DecorativeBubbles />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-10">
          {/* Title + Results count */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[40px] font-extrabold leading-none text-[#202020]">
                Shop
              </h1>
              <p className="mt-3 text-[16px] leading-[26px] text-[#444444]">
                Choose from our wide range of professional services
              </p>
            </div>
            <div className="pt-6">
              <p className="text-[15px] font-medium text-[#444444]">
                {filteredServices.length === 0
                  ? "Showing 0 results"
                  : `Showing 1–${filteredServices.length} of ${filteredServices.length} results`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
            SIDEBAR FILTERS + SERVICE GRID SECTION
      =========================================================== */}
      <section className="relative bg-[#FDF6E8] pb-[120px]">
        {/* Same fix here: bubbles clipped in their own wrapper so the
            <section> itself has no overflow-hidden, which is what was
            breaking the sidebar's sticky positioning and making it
            render lower than the card grid. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <DecorativeBubbles />
        </div>

        <div className="relative mx-auto flex max-w-[1440px] items-start gap-7 px-10">
          {/* ---------------- SIDEBAR: FILTERS ---------------- */}
         <FilterSidebar
  search={search}
  setSearch={setSearch}
  categories={categories}
  selectedCategories={selectedCategories}
  toggleCategory={toggleCategory}
  price={price}
  setPrice={setPrice}
/>
          {/* ---------------- END SIDEBAR ---------------- */}

          {/* ---------------- SERVICE CARDS GRID ---------------- */}
          <div className="flex-1 self-start">
            <div className="grid grid-cols-4 gap-x-[18px] gap-y-[28px]">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="
                    group
                    relative
                    h-[294px]
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-white
                    bg-gradient-to-b
                    from-[#FFEFCF]
                    to-[#FFE2A7]
                    p-[18px]
                    shadow-[0_10px_22px_rgba(0,0,0,.08)]
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_18px_35px_rgba(0,0,0,.12)]
                  "
                >
                  {/* Service icon */}
                  <div
                    className="
                      relative
                      mx-auto
                      flex
                      h-[72px]
                      w-[72px]
                      items-center
                      justify-center
                      rounded-[16px]
                      border
                      border-[#E5E5E5]
                      bg-white
                      shadow-[0_6px_12px_rgba(0,0,0,.08)]
                    "
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      draggable="false"
                      className="
                        h-[60px]
                        w-[60px]
                        object-contain
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Service title */}
                  <h3
                    className="
                      mt-5
                      text-center
                      text-[18px]
                      font-bold
                      leading-[24px]
                      text-[#202020]
                    "
                  >
                    {service.title}
                  </h3>

                  {/* Service description */}
                  <p
                    className="
                      mx-auto
                      mt-2
                      h-[36px]
                      w-[170px]
                      text-center
                      text-[13px]
                      leading-[18px]
                      text-[#202020]
                    "
                  >
                    {service.description}
                  </p>

                  {/* Plans button */}
                  <Link
                    to={`/shop/${service.slug}`}
                    className="
                      absolute
                      bottom-[18px]
                      left-1/2
                      flex
                      h-[42px]
                      w-[132px]
                      -translate-x-1/2
                      items-center
                      justify-center
                      rounded-[10px]
                      border
                      border-white
                      bg-gradient-to-b
                      from-[#FFE6AF]
                      to-[#FFD488]
                      text-[14px]
                      font-semibold
                      text-[#202020]
                      shadow-[0_4px_8px_rgba(0,0,0,.08)]
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:from-[#F5A623]
                      hover:to-[#F8B038]
                    "
                  >
                  View Plans
                  </Link>
                </div>
              ))}
            </div>

            {/* Empty state when no services match filters */}
            {filteredServices.length === 0 && (
              <p className="mt-10 text-center text-[16px] text-[#202020]">
                No services match your filters.
              </p>
            )}
          </div>
          {/* ---------------- END SERVICE CARDS GRID ---------------- */}
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