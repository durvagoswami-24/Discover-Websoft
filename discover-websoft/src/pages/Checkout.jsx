import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { submitQuotationRequest } from "../api/quotation";
import { getGstBreakdown } from "../utils/gst";
import { clearCart } from "../features/cart/cartSlice";

function Row({ label, value, bold = false, large = false }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`${bold ? "font-bold" : "font-medium"} ${
          large ? "text-[15px]" : "text-[13px]"
        } text-[#202020]`}
      >
        {label}
      </span>
      <span
        className={`${bold ? "font-bold" : "font-semibold"} ${
          large ? "text-[20px]" : "text-[13px]"
        } text-[#202020]`}
      >
        {value}
      </span>
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Reads straight from the cart (rather than a one-off navigation
  // state) so Checkout works correctly after the Cart page step, and
  // so refreshing this page doesn't lose the order.
  const items = useSelector((state) => state.cart.items);

  const [pincode, setPincode] = useState("");
  const [guestInfo, setGuestInfo] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [allEmailsSent, setAllEmailsSent] = useState(true);

  // Empty cart -- either a direct link/refresh, already checked out, or
  // navigated here without adding anything via "Confirm Selection" first.
  if (items.length === 0 && !success) {
    return (
      <section className="mx-auto flex min-h-[50vh] max-w-[600px] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-[22px] font-bold text-[#1F1F1F]">
          No order to check out
        </h1>
        <p className="mt-2 text-[14px] text-[#666]">
          Pick a plan, hit "Confirm Selection", then proceed to checkout from your cart.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-6 h-[46px] rounded-xl bg-[#202020] px-8 text-[13px] font-bold tracking-[1px] text-[#F7D38A]"
        >
          BROWSE SERVICES
        </button>
      </section>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const gst = getGstBreakdown(pincode, subtotal);
  const pincodeEntered = /^\d{6}$/.test(pincode);

  const handleGuestChange = (e) =>
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pincodeEntered) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Each cart item is its own distinct quote (different service/plan/
      // configuration), so it's submitted as its own quotation request --
      // just gathered under a single checkout step so the person only
      // enters their details and pincode once.
      let emailsSent = true;
      for (const item of items) {
        const itemGst = getGstBreakdown(pincode, item.price || 0);

        const result = await submitQuotationRequest({
          serviceSlug: item.serviceSlug,
          subServiceSlug: item.subServiceSlug,
          planSlug: item.slug,
          planName: item.name,
          quotationType: item.quotationType,
          details: { ...item.details, pincode },
          subtotal: item.price,
          customerName: user ? user.name : guestInfo.name,
          customerPhone: user ? user.phone : guestInfo.phone,
          customerEmail: user ? user.email : guestInfo.email,
          cgst: itemGst.type === "split" ? itemGst.cgst : 0,
          sgst: itemGst.type === "split" ? itemGst.sgst : 0,
          igst: itemGst.type === "igst" ? itemGst.igst : 0,
          grandTotal: itemGst.grandTotal,
        });
        emailsSent = emailsSent && result.customerEmailSent === true;
      }

      setAllEmailsSent(emailsSent);
      dispatch(clearCart());
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not submit your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="mx-auto flex min-h-[50vh] max-w-[600px] flex-col items-center justify-center px-6 text-center">
        <div className="rounded-2xl border border-[#B7E4C7] bg-[#E9F7EF] px-8 py-6">
          <h1 className="text-[20px] font-bold text-[#1E7A46]">
            Request submitted!
          </h1>
          <p className="mt-2 text-[14px] text-[#1E7A46]">
          {allEmailsSent
            ? "We emailed the quotation details to your account email. Please check your inbox and spam folder."
            : "Your request was received, but we could not email every quotation. Our team will follow up."}
          </p>
        </div>
        <button
          onClick={() => navigate("/shop")}
          className="mt-6 h-[46px] rounded-xl bg-[#202020] px-8 text-[13px] font-bold tracking-[1px] text-[#F7D38A]"
        >
          CONTINUE BROWSING
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[760px] px-6 py-12 sm:px-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1.5 text-[13px] font-semibold text-[#666] hover:text-[#202020]"
      >
        <HiArrowLeft />
        Back
      </button>

      <h1 className="text-[26px] font-black text-[#1F1F1F]">Checkout</h1>
      <p className="mt-1 text-[14px] text-[#666]">
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-[24px] border border-[#EACB8B] bg-[#FFE9B9] px-6 py-6 shadow-[0_10px_24px_rgba(0,0,0,.08)]"
      >
        {/* Items being checked out */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center justify-between text-[13px]"
            >
              <span className="font-medium text-[#202020]">{item.name}</span>
              <span className="font-semibold text-[#202020]">
                ₹{(item.price || 0).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="my-5 border-t border-[#E7CF99]" />

        {!user && (
          <>
            <p className="mb-3 text-[13px] font-semibold text-[#202020]">
              Your details
            </p>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={guestInfo.name}
                onChange={handleGuestChange}
                className="w-full rounded-lg border border-[#E7CF99] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#F5A623]"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone number"
                value={guestInfo.phone}
                onChange={handleGuestChange}
                className="w-full rounded-lg border border-[#E7CF99] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#F5A623]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                value={guestInfo.email}
                onChange={handleGuestChange}
                className="w-full rounded-lg border border-[#E7CF99] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#F5A623]"
              />
            </div>
            <div className="my-5 border-t border-[#E7CF99]" />
          </>
        )}

        <p className="mb-1 text-[13px] font-semibold text-[#202020]">
          Delivery Pincode
        </p>
        <p className="mb-2 text-[11.5px] text-[#6B5A32]">
          Determines whether GST applies as CGST+SGST or IGST.
        </p>
        <input
          type="text"
          inputMode="numeric"
          required
          maxLength={6}
          placeholder="e.g. 462001"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          className="w-full rounded-lg border border-[#E7CF99] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#F5A623]"
        />

        <div className="my-5 border-t border-[#E7CF99]" />

        <div className="space-y-2.5">
          <Row
            label="Subtotal"
            value={`₹${subtotal.toLocaleString()}`}
          />

          {gst.type === "combined" && (
            <Row
              label="GST (18%) -- enter pincode for exact split"
              value={`₹${gst.gst.toLocaleString()}`}
            />
          )}
          {gst.type === "split" && (
            <>
              <Row label="CGST (9%)" value={`₹${gst.cgst.toLocaleString()}`} />
              <Row label="SGST (9%)" value={`₹${gst.sgst.toLocaleString()}`} />
            </>
          )}
          {gst.type === "igst" && (
            <Row label="IGST (18%)" value={`₹${gst.igst.toLocaleString()}`} />
          )}
        </div>

        <div className="my-5 border-t border-[#E7CF99]" />

        <Row
          label="GRAND TOTAL"
          value={`₹${gst.grandTotal.toLocaleString()}`}
          large
          bold
        />

        {error && (
          <p className="mt-4 text-[12.5px] font-medium text-[#E53935]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 h-[46px] w-full rounded-xl bg-[#202020] text-[13px] font-bold tracking-[2px] text-[#F7D38A] transition-all hover:bg-black disabled:opacity-60"
        >
          {submitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
        </button>

        <p className="mt-3 text-center text-[10px] text-[#202020]">
          * TERMS AND CONDITIONS APPLY
        </p>
      </form>
    </section>
  );
}
