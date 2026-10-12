import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiHeart, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";

import { services } from "../data/services";
import FAQ from "../components/FAQ";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

// FAQ Assets
import bubbleBg from "../assets/bubble.png";
import headingBg from "../assets/heading-bg.png";
import girlImg from "../assets/faq.png";
import faqOpenIcon from "../assets/faq-icon1.png";
import faqCloseIcon from "../assets/faq-icon.png";

export default function SubServicePage() {
  const { serviceSlug, subServiceSlug } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  // ==========================================
  // FIND SERVICE
  // ==========================================

  const service = services.find(
    (item) => item.slug === serviceSlug
  );

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Service Not Found
        </h1>
      </div>
    );
  }

  // ==========================================
  // FIND SUB SERVICE
  // ==========================================

  const subService = service.subServices.find(
    (item) => item.slug === subServiceSlug
  );

  if (!subService) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Sub Service Not Found
        </h1>
      </div>
    );
  }

  return (
    <>
      {/* ==========================================
              HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-[#FDF6E8] pt-[65px] pb-[20px]">

        <div className="relative mx-auto max-w-[1440px] px-10">

          <h1 className="text-[42px] font-extrabold text-[#202020]">
            {subService.title}
          </h1>

          <p className="mt-4 max-w-[900px] text-[18px] leading-[30px] text-[#202020]">
            Choose the perfect package for your business.
          </p>

        </div>

      </section>

      {/* ==========================================
              PLAN GRID
      ========================================== */}

      <section className="bg-[#FDF6E8] pb-[100px]">

        <div className="mx-auto max-w-[1440px] px-10">

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {subService.plans.map((plan) => {
              const isWishlisted = wishlistItems.some(
                (w) =>
                  w.slug === plan.slug &&
                  w.serviceSlug === service.slug &&
                  w.subServiceSlug === subService.slug
              );
              const isInCart = cartItems.some((c) => c.slug === plan.slug);

              const handleWishlist = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isWishlisted) {
                  dispatch(removeFromWishlist({
                    slug: plan.slug,
                    serviceSlug: service.slug,
                    subServiceSlug: subService.slug,
                  }));
                } else {
                  dispatch(
                    addToWishlist({
                      ...plan,
                      serviceSlug: service.slug,
                      subServiceSlug: subService.slug,
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
                    ...plan,
                    serviceSlug: service.slug,
                    serviceTitle: service.title,
                  })
                );
              };

              return (

              <Link
                key={plan.id}
                to={`/service/${service.slug}/${subService.slug}/${plan.slug}`}
                className="
                  group
                  relative
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
                "
              >

                {plan.tag && (
                  <span className="absolute right-5 top-5 rounded bg-[#F5A623] px-3 py-1 text-[10px] font-bold">
                    {plan.tag}
                  </span>
                )}

                <button
                  onClick={handleWishlist}
                  className={`
                    absolute
                    right-5
                    top-5
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    transition-colors
                    duration-300
                    ${
                      isWishlisted
                        ? "bg-[#F5A623] text-white"
                        : "bg-white text-[#F5A623]"
                    }
                  `}
                >
                  {isWishlisted ? <HiHeart /> : <HiOutlineHeart />}
                </button>

                <img
                  src={plan.image}
                  alt={plan.name}
                  className="
                    h-[220px]
                    w-full
                    rounded-[18px]
                    object-cover
                  "
                />

                <h3 className="mt-4 text-[20px] font-bold">
                  {plan.name}
                </h3>

                {plan.subtitle && (
                  <p className="mt-1 text-[13px] text-[#202020]">
                    {plan.subtitle}
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">

                  <h4 className="text-[22px] font-bold">
                    ₹{plan.price.toLocaleString()}
                    {plan.priceUnit || ""}
                  </h4>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      px-4
                      py-2
                      transition-colors
                      duration-300
                      ${
                        isInCart
                          ? "cursor-default bg-[#F0EAD8] text-[#999]"
                          : "bg-[#202020] text-[#F5C15C] hover:bg-[#F5A623] hover:text-[#202020]"
                      }
                    `}
                  >
                    <HiOutlineShoppingCart />
                    {isInCart ? "IN CART" : "ADD"}
                  </button>

                </div>

              </Link>

              );
            })}

          </div>

        </div>

      </section>

      {/* ==========================================
              FAQ
      ========================================== */}

      {subService.faq && (

        <FAQ
          faqData={subService.faq}
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
