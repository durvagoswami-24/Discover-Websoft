import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineTrash, HiOutlineShoppingCart, HiOutlineHeart, HiArrowRight } from "react-icons/hi";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rawItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const items = rawItems.filter((item) => item && item.slug && item.price != null);

  useEffect(() => {
    rawItems.forEach((item) => {
      if (!item || !item.slug || item.price == null) {
        if (item?.slug) dispatch(removeFromWishlist(item.slug));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawItems]);

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-8 text-center">
        <HiOutlineHeart className="mb-4 text-[56px] text-[#E5E0D5]" />
        <h1 className="text-[26px] font-bold text-[#1F1F1F]">
          Your wishlist is empty
        </h1>
        <p className="mt-2 text-[15px] text-[#666]">
          Save plans you're considering so you can find them again easily.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-8 flex h-[50px] items-center gap-2 rounded-[12px] bg-[#1F1F1F] px-8 text-[14px] font-bold tracking-[1px] text-[#F5A623] transition-all duration-300 hover:bg-[#F5A623] hover:text-[#1F1F1F]"
        >
          BROWSE SERVICES
          <HiArrowRight className="text-[16px]" />
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10">
      <h1 className="text-[30px] font-black text-[#1F1F1F]">Your Wishlist</h1>
      <p className="mt-1 text-[14px] text-[#666]">
        {items.length} {items.length === 1 ? "item" : "items"} saved
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isInCart = cartItems.some((c) => c.slug === item.slug);

          return (
            <div
              key={item.slug}
              className="overflow-hidden rounded-[16px] border border-[#E5E0D5] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <Link to={item.subServiceSlug
                ? `/service/${item.serviceSlug}/${item.subServiceSlug}/${item.slug}`
                : `/service/${item.serviceSlug}/${item.slug}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[160px] w-full object-cover"
                />
              </Link>

              <div className="p-4">
                <Link
                  to={item.subServiceSlug
                    ? `/service/${item.serviceSlug}/${item.subServiceSlug}/${item.slug}`
                    : `/service/${item.serviceSlug}/${item.slug}`}
                  className="block truncate text-[16px] font-bold text-[#1F1F1F] hover:text-[#F5A623]"
                >
                  {item.name}
                </Link>
                {item.serviceTitle && (
                  <p className="mt-0.5 truncate text-[13px] text-[#888]">
                    {item.serviceTitle}
                  </p>
                )}
                <p className="mt-2 text-[16px] font-bold text-[#F5A623]">
                  ₹{item.price.toLocaleString()}/-
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => !isInCart && dispatch(addToCart(item))}
                    disabled={isInCart}
                    className={`flex h-10 flex-1 items-center justify-center gap-1.5 rounded-[10px] text-[13px] font-bold transition-all duration-300 ${
                      isInCart
                        ? "cursor-default bg-[#F0EAD8] text-[#999]"
                        : "bg-[#1F1F1F] text-[#F5A623] hover:bg-[#F5A623] hover:text-[#1F1F1F]"
                    }`}
                  >
                    <HiOutlineShoppingCart size={15} />
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist({
                      slug: item.slug,
                      serviceSlug: item.serviceSlug,
                      subServiceSlug: item.subServiceSlug,
                    }))}
                    title="Remove from wishlist"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[#B0473C] transition-colors hover:bg-[#FCEAE8]"
                  >
                    <HiOutlineTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
