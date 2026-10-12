import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineTrash, HiArrowRight, HiOutlineShoppingCart } from "react-icons/hi";
import {
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rawItems = useSelector((state) => state.cart.items);

  // Defends against any stale/malformed entry that might already be
  // sitting in localStorage (e.g. saved by an older version of this
  // app before every field was guaranteed) -- rather than crash the
  // whole page on a missing field, drop the bad entry and clean it
  // out of the persisted cart for next time.
  const items = rawItems.filter((item) => item && item.slug && item.price != null);

  useEffect(() => {
    rawItems.forEach((item) => {
      if (!item || !item.slug || item.price == null) {
        if (item?.slug) dispatch(removeFromCart(item.slug));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawItems]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-8 text-center">
        <HiOutlineShoppingCart className="mb-4 text-[56px] text-[#E5E0D5]" />
        <h1 className="text-[26px] font-bold text-[#1F1F1F]">
          Your cart is empty
        </h1>
        <p className="mt-2 text-[15px] text-[#666]">
          Browse our services and add a plan to get started.
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
      <h1 className="text-[30px] font-black text-[#1F1F1F]">Your Cart</h1>
      <p className="mt-1 text-[14px] text-[#666]">
        {items.length} {items.length === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-4 rounded-[16px] border border-[#E5E0D5] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 shrink-0 rounded-[10px] object-cover"
              />

              <div className="min-w-0 flex-1">
                <Link
                  to={`/service/${item.serviceSlug}/${item.slug}`}
                  className="block truncate text-[16px] font-bold text-[#1F1F1F] hover:text-[#F5A623]"
                >
                  {item.name}
                </Link>
                {item.serviceTitle && (
                  <p className="mt-0.5 text-[13px] text-[#888]">
                    {item.serviceTitle}
                  </p>
                )}
                <p className="mt-1 text-[15px] font-bold text-[#F5A623]">
                  ₹{item.price.toLocaleString()}/-
                </p>
              </div>

              {/* Quantity stepper */}
              <div className="flex items-center gap-2 rounded-[10px] border border-[#E5E0D5] px-2 py-1">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        slug: item.slug,
                        quantity: Math.max(1, (item.quantity || 1) - 1),
                      })
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[16px] font-bold text-[#1F1F1F] hover:bg-[#FDF6E8]"
                >
                  −
                </button>
                <span className="w-6 text-center text-[14px] font-semibold">
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        slug: item.slug,
                        quantity: (item.quantity || 1) + 1,
                      })
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[16px] font-bold text-[#1F1F1F] hover:bg-[#FDF6E8]"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.slug))}
                title="Remove"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[#B0473C] transition-colors hover:bg-[#FCEAE8]"
              >
                <HiOutlineTrash size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full shrink-0 rounded-[16px] border border-[#E5E0D5] bg-[#FDF6E8] p-6 lg:w-[320px]">
          <h2 className="text-[18px] font-bold text-[#1F1F1F]">
            Order Summary
          </h2>
          <div className="mt-4 flex items-center justify-between text-[14px] text-[#444]">
            <span>Subtotal</span>
            <span className="font-semibold">
              ₹{subtotal.toLocaleString()}/-
            </span>
          </div>
          <p className="mt-1 text-[12px] text-[#888]">
            Taxes are calculated at the quotation step for each plan.
          </p>
          <div className="my-4 h-px bg-[#E6D4A4]" />
          <div className="flex items-center justify-between text-[16px] font-bold text-[#1F1F1F]">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString()}/-</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#1F1F1F] text-[14px] font-bold tracking-[1px] text-[#F5A623] transition-all duration-300 hover:bg-black"
          >
            PROCEED TO CHECKOUT
            <HiArrowRight className="text-[16px]" />
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#E5E0D5] text-[13px] font-semibold text-[#1F1F1F] transition-all duration-300 hover:bg-[#FDF6E8]"
          >
            KEEP BROWSING
          </button>
        </div>
      </div>
    </section>
  );
}
