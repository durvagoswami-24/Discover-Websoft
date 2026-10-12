import FilterSidebar from "../components/FilterSidebar";
import FAQ from "../components/FAQ";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiHeart, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { services } from "../data/services";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

// FAQ assets (same ones used on Home.jsx and Shop.jsx)
import bubbleBg from "../assets/bubble.png";
import headingBg from "../assets/heading-bg.png";
import girlImg from "../assets/faq.png";
import faqOpenIcon from "../assets/faq-icon1.png";
import faqCloseIcon from "../assets/faq-icon.png";

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const service = services.find((item) => item.slug === serviceSlug);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
      </div>
    );
  }

  // ==========================================================
  // SIDEBAR STATE
  // ==========================================================
  const [search, setSearch] = useState("");

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

  const [selectedCategories, setSelectedCategories] = useState([
    service.category,
  ]);

  const [price, setPrice] = useState(1000000);


  const toggleCategory = (category) => {
    if (category === "All Services") {
      setSelectedCategories(["All Services"]);
      return;
    }

    setSelectedCategories([category]);
  };

  return (
    <>
      {/* ==========================================================
            SERVICE HERO
      =========================================================== */}
      <section className="relative overflow-hidden bg-[#FDF6E8] pt-[65px]
pb-[20px]">
        {/* Decorative Bubble 1 */}
        <div className="absolute left-[-35px] top-[40px] h-[70px] w-[70px] rounded-full bg-gradient-to-br from-white via-[#FFE7B2] to-[#F8BE54] opacity-70"></div>

        {/* Decorative Bubble 2 */}
        <div className="absolute right-[-55px] top-[45px] h-[180px] w-[180px] rounded-full bg-gradient-to-br from-white via-[#FFE7B2] to-[#F8BE54] opacity-60"></div>

        {/* Decorative Dot */}
        <div className="absolute right-[180px] top-[90px] h-3 w-3 rounded-full bg-[#F8BE54]"></div>

        <div className="relative mx-auto max-w-[1440px] px-10">
          <h1
            className="
             text-[42px]
leading-[48px]
font-extrabold
              text-[#202020]
            "
          >
            {service.pageTitle}
          </h1>

          <p
            className="
              mt-4
              max-w-[980px]
              text-[18px]
              leading-[32px]
              text-[#202020]
            "
          >
            {service.pageDescription}
          </p>
        </div>
      </section>

      {/* ==========================================================
            SERVICE BODY
      =========================================================== */}
     <section className="relative -mt-[6px] bg-[#FDF6E8] pb-[110px]">
        <div className="mx-auto max-w-[1440px] px-10">
         <div className="flex items-start gap-[26px]">
            {/* ---------------- SIDEBAR ---------------- */}
            <div className="w-[305px] shrink-0 self-start pt-10">
              <FilterSidebar
                search={search}
                setSearch={setSearch}
                categories={categories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                price={price}
                setPrice={setPrice}
              />
            </div>
            {/* ---------------- END SIDEBAR ---------------- */}

            {/* ---------------- PLAN / SUB SERVICE GRID ---------------- */}
<div className="flex-1 self-start pt-10">

  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

    {(service.subServices || service.plans).map((item) => {

      const isSubService = !!service.subServices;
      const isWishlisted =
        !isSubService && wishlistItems.some(
          (w) => w.slug === item.slug && w.serviceSlug === service.slug
        );
      const isInCart =
        !isSubService && cartItems.some((c) => c.slug === item.slug);

      const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
          dispatch(removeFromWishlist({
            slug: item.slug,
            serviceSlug: service.slug,
          }));
        } else {
          dispatch(
            addToWishlist({
              ...item,
              serviceSlug: service.slug,
              serviceTitle: service.title,
            })
          );
        }
      };

      const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInCart) return;
        dispatch(
          addToCart({
            ...item,
            serviceSlug: service.slug,
            serviceTitle: service.title,
          })
        );
      };

      return (

        <Link
          key={item.id}
          to={
            isSubService
              ? `/shop/${service.slug}/${item.slug}`
              : `/service/${service.slug}/${item.slug}`
          }
          className="
            group
            relative
            block
            overflow-hidden
            rounded-[24px]
            bg-gradient-to-b
            from-[#FFEFCF]
            to-[#FFE2A7]
            p-[18px]
            shadow-[0_12px_28px_rgba(0,0,0,.10)]
            transition-all
            duration-300
            hover:-translate-y-[6px]
            hover:shadow-[0_20px_38px_rgba(0,0,0,.14)]
          "
        >

          {item.tag && (
            <span
              className="
                absolute
                top-[-1px]
                right-[18px]
                rounded-[4px]
                bg-[#F5A623]
                px-[10px]
                py-[3px]
                text-[10px]
                font-bold
                tracking-[1px]
                uppercase
                text-[#202020]
              "
            >
              {item.tag}
            </span>
          )}

          {!isSubService && (
            <button
              type="button"
              onClick={handleWishlist}
              className={`
                absolute
                right-5
                top-5
                z-10
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                shadow-[0_4px_8px_rgba(0,0,0,.1)]
                transition-colors
                duration-300
                ${
                  isWishlisted
                    ? "bg-[#F5A623] text-white"
                    : "bg-white text-[#F5A623]"
                }
              `}
            >
              {isWishlisted ? (
                <HiHeart className="text-[14px]" />
              ) : (
                <HiOutlineHeart className="text-[14px]" />
              )}
            </button>
          )}

          <img
            src={item.image || service.image}
            alt={item.title || item.name}
            draggable="false"
            className="
              h-[205px]
              w-full
              rounded-[22px]
              object-cover
            "
          />

          <h3 className="mt-4 text-[20px] font-bold leading-[26px] text-[#202020]">
            {item.title || item.name}
          </h3>

          {!isSubService && item.subtitle && (
            <p className="mt-1 text-[13px] text-[#202020]">
              {item.subtitle}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">

            {!isSubService ? (
              <h4 className="text-[18px] font-extrabold text-[#202020]">
                ₹{item.price.toLocaleString()}
                {item.priceUnit || ""}
              </h4>
            ) : item.plans?.length ? (
              (() => {
                const prices = item.plans.map((p) => p.price);
                const min = Math.min(...prices);
                const max = Math.max(...prices);

                return (
                  <h4 className="text-[15px] font-extrabold text-[#202020]">
                    ₹{min.toLocaleString()}
                    {min !== max ? ` - ₹${max.toLocaleString()}` : ""}
                    {item.priceUnit || ""}
                  </h4>
                );
              })()
            ) : (
              <span className="text-[14px] font-medium text-[#202020]">
                View Plans
              </span>
            )}

            {isSubService ? (
              <span
                className="
                  flex
                  h-[36px]
                  w-[82px]
                  items-center
                  justify-center
                  gap-1
                  rounded-[10px]
                  bg-[#202020]
                  text-[12px]
                  font-semibold
                  text-[#F5C15C]
                "
              >
                <HiOutlineShoppingCart className="text-[13px]" />
                VIEW
              </span>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className={`
                  flex
                  h-[36px]
                  min-w-[82px]
                  items-center
                  justify-center
                  gap-1
                  rounded-[10px]
                  px-2
                  text-[12px]
                  font-semibold
                  transition-colors
                  duration-300
                  ${
                    isInCart
                      ? "cursor-default bg-[#F0EAD8] text-[#999]"
                      : "bg-[#202020] text-[#F5C15C] hover:bg-[#F5A623] hover:text-[#202020]"
                  }
                `}
              >
                <HiOutlineShoppingCart className="text-[13px]" />
                {isInCart ? "IN CART" : "ADD"}
              </button>
            )}

          </div>

        </Link>

      );

    })}

  </div>

</div>
{/* ---------------- END PLAN / SUB SERVICE GRID ---------------- */}
          </div>
        </div>
      </section>

      {/* ==========================================================
            FAQ SECTION — same reusable component as Home/Shop,
            questions/answers driven entirely by service.faq
      =========================================================== */}
      {service.faq && (
        <FAQ
          faqData={service.faq}
          bubbleBg={bubbleBg}
          headingBg={headingBg}
          girlImg={girlImg}
          faqOpenIcon={faqOpenIcon}
          faqCloseIcon={faqCloseIcon}
        />
      )}
    </>
  );
}
