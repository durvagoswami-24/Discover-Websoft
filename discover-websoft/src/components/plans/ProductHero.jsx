import { HiHeart, HiOutlineHeart, HiOutlineChatAlt2, HiLockClosed, HiChevronDown, HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
import GetQuoteModal from "./GetQuoteModal";

export default function ProductHero({
  service,
  plan,
  serviceSlug = service.slug,
  subServiceSlug,
  serviceTitle = service.title,
}) {
const dispatch = useDispatch();
const navigate = useNavigate();
const [addedToCart, setAddedToCart] = useState(false);
const [quoteModalOpen, setQuoteModalOpen] = useState(false);
const [readMoreOpen, setReadMoreOpen] = useState(false);

const cartItems = useSelector((state) => state.cart.items);
const isInCart = cartItems.some((item) => item.slug === plan.slug);

const wishlistItems = useSelector(
  (state) => state.wishlist.items
);

const isWishlisted = wishlistItems.some(
  (item) =>
    item.slug === plan.slug &&
    item.serviceSlug === serviceSlug &&
    (item.subServiceSlug || "") === (subServiceSlug || "")
);

const handleWishlist = (e) => {
  // Belt-and-suspenders: stop this from bubbling to anything else
  // listening on ancestors, and stop a default action in case this
  // button is ever nested inside a <form> or <a> during future edits.
  e.preventDefault();
  e.stopPropagation();

  if (isWishlisted) {
    dispatch(removeFromWishlist({
      slug: plan.slug,
      serviceSlug,
      subServiceSlug,
    }));
  } else {
    dispatch(
      addToWishlist({
        ...plan,
        serviceSlug,
        subServiceSlug,
        serviceTitle,
      })
    );
  }
};

const handleAddToCart = () => {
  if (isInCart) return;

  dispatch(
    addToCart({
      ...plan,
      serviceSlug,
      subServiceSlug,
      serviceTitle,
    })
  );

  // Brief confirmation state on the button, since there's no toast
  // system in this app yet.
  setAddedToCart(true);
  setTimeout(() => setAddedToCart(false), 2000);
};

  return (
    <section className="relative overflow-hidden bg-[#FDF6E8] pt-[70px] pb-[110px]">
      {/* Left Bubble */}
      <div className="pointer-events-none absolute left-[-60px] top-[80px] h-[230px] w-[230px] rounded-full bg-gradient-to-br from-white via-[#FFE6AE] to-[#F5B041] opacity-30 blur-[4px]" />

      {/* Right Bubble */}
      <div className="pointer-events-none absolute right-[-70px] top-[40px] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-white via-[#FFE8BC] to-[#F5B041] opacity-50" />

      {/* Small Dot */}
      <div className="pointer-events-none absolute right-[280px] top-[110px] h-3 w-3 rounded-full bg-[#F5A623]" />

      {/* Extra decorative circles */}
      <div className="pointer-events-none absolute left-[220px] top-[10px] h-2.5 w-2.5 rounded-full bg-[#F5B041] opacity-60" />
      <div className="pointer-events-none absolute right-[120px] bottom-[60px] h-4 w-4 rounded-full bg-gradient-to-br from-white via-[#FFE6AE] to-[#F5B041] opacity-40" />

      <div className="relative z-10 mx-auto flex max-w-[1440px] items-start gap-[60px] px-[32px]">
        {/* =======================================================
              LEFT IMAGE — full-bleed, no white card/padding
        ======================================================= */}
        <div className="w-[49%] shrink-0">
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              shadow-[0_12px_32px_rgba(0,0,0,.08)]
            "
          >
            <img
              src={plan.image}
              alt={plan.name}
              draggable="false"
              className="
                h-[690px]
                w-full
                object-cover
                transition-all
                duration-500
                group-hover:scale-[1.02]
              "
            />
          </div>

          {/* Admin Login */}
          <button
            onClick={() => navigate("/admin/login")}
            className="
              mt-5
              flex
              items-center
              gap-1.5
              rounded-[12px]
              px-2
              py-1
              text-[11px]
              font-semibold
              uppercase
              tracking-[1.5px]
              text-[#A9A099]
              transition-colors
              duration-300
              hover:text-[#F5A623]
            "
          >
            <HiLockClosed className="text-[12px]" />
            Admin Login
          </button>
        </div>

        {/* =======================================================
              RIGHT CONTENT
        ======================================================= */}
        <div className="flex-1 pt-2">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            {/* Badge */}
            <span
              className="
                rounded-[10px]
                bg-[#F5A623]
                px-5
                py-2.5
                text-[11px]
                font-bold
                tracking-[2px]
                text-[#202020]
              "
            >
              {plan.tag}
            </span>

            {/* Buttons — white pill, thin neutral border, black text/icon */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="
                  flex
                  h-[44px]
                  items-center
                  gap-2
                  rounded-[10px]
                  border
                  border-[#E5E0D5]
                  bg-white
                  px-5
                  text-[14px]
                  font-semibold
                  text-[#202020]
                  transition-all
                  duration-300
                  hover:border-[#F5A623]
                "
              >
                <HiOutlineChatAlt2 className="text-[16px]" />
                Get Quote
              </button>

              <button
  type="button"
  onClick={handleWishlist}
  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
  aria-pressed={isWishlisted}
  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
  className={`
    flex
    h-[44px]
    w-[44px]
    items-center
    justify-center
    rounded-[10px]
    border
    transition-all
    duration-300

    ${
      isWishlisted
        ? "bg-[#F5A623] border-[#F5A623]"
        : "bg-white border-[#E5E0D5] hover:border-[#F5A623]"
    }
  `}
>
  {isWishlisted ? (
    <HiHeart className="text-[18px] text-white" />
  ) : (
    <HiOutlineHeart className="text-[18px] text-[#202020]" />
  )}
</button>
            </div>
          </div>

          {/* Title */}
          <h1
            className="
              mt-8
             text-[38px]
leading-[46px]
font-black
              
              text-[#1F1F1F]
            "
          >
            {plan.name}
          </h1>

          {/* Price — orange accent */}
          <h2
            className="
              mt-4
              text-[30px]
              font-extrabold
              text-[#F5A623]
            "
          >
            ₹{plan.price.toLocaleString()}/-
          </h2>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-[560px]
              text-[16px]
              leading-[24px]
              text-[#202020]
            "
          >
            {plan.description}
          </p>

          {/* ================================
      ACTION BUTTON — black bg, orange text, arrow
================================ */}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              className="
                flex
                h-[58px]
                w-full
                max-w-[520px]
                items-center
                justify-center
                gap-2
                rounded-[12px]
                bg-[#1F1F1F]
                px-8
                text-[15px]
                font-bold
                tracking-[1px]
                text-[#F5A623]
                transition-all
                duration-300
                hover:bg-[#F5A623]
                hover:text-[#1F1F1F]
              "
            >
              {addedToCart ? "ADDED TO CART" : isInCart ? "ALREADY IN CART" : "ADD TO CART"}
              <HiArrowRight className="text-[18px]" />
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-[#E6D4A4]" />

          {/* ================================
      DELIVERABLES — outlined ring icons
================================ */}
          <div>
            <h3 className="text-[22px] font-bold text-[#202020]">
              Deliverables
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-4">
              {plan.deliverables.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div
                    className="
                      flex
                      h-4
                      w-4
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-[#F5A623]
                      text-[9px]
                      font-bold
                      text-[#F5A623]
                    "
                  >
                    ✓
                  </div>

                  <span className="text-[15px] text-[#202020]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================================
      READ MORE
================================ */}
          {service.readMore && service.readMore.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => setReadMoreOpen((v) => !v)}
                aria-expanded={readMoreOpen}
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[15px]
                  font-semibold
                  text-[#F5A623]
                  transition-all
                  duration-300
                  hover:underline
                "
              >
                {readMoreOpen ? "Show Less" : "Read More"}
                <HiChevronDown
                  className={`text-[16px] transition-transform duration-300 ${
                    readMoreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {readMoreOpen && (
                <ul className="mt-4 max-w-[560px] space-y-3">
                  {service.readMore.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[15px] leading-[22px] text-[#202020]"
                    >
                      <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#F5A623]" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {quoteModalOpen && (
        <GetQuoteModal
          service={service}
          plan={plan}
          onClose={() => setQuoteModalOpen(false)}
        />
      )}
    </section>
  );
}
