import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { submitQuotationRequest } from "../../../api/quotation";
import PhoneInput from "../../PhoneInput";

// Renders the "CONFIRM SELECTION" button plus the submission flow behind
// it. Logged-in users submit in one click (their account info is sent
// automatically). Guests get a small inline form asking for name/phone/
// email, since the backend needs some way to contact them about a quote
// that has no linked account.
// Simple, standard email format check -- good enough to catch typos
// like missing "@" or "." without being overly strict about edge cases.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuoteConfirmButton({ getPayload }) {
  const { user } = useAuth();

  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ name: "", phone: "", email: "" });
  const [phoneValid, setPhoneValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleGuestChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  const handleGuestPhoneChange = (phone) => {
    setGuestInfo({ ...guestInfo, phone });
  };

  async function submit(customerFields) {
    setSubmitting(true);
    setError("");
    try {
      const result = await submitQuotationRequest({
        ...getPayload(),
        ...customerFields,
      });
      setEmailSent(result.customerEmailSent === true);
      setSuccess(true);
      setShowGuestForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not submit your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const handleConfirmClick = () => {
    if (submitting || success) return;

    if (user) {
      // Logged in -- contact details already exist on the account.
      submit({
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
      });
    } else {
      setShowGuestForm(true);
    }
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(guestInfo.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phoneValid) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    submit({
      customerName: guestInfo.name,
      customerPhone: guestInfo.phone,
      customerEmail: guestInfo.email,
    });
  };

  if (success) {
    return (
      <div className="mt-6 rounded-xl border border-[#B7E4C7] bg-[#E9F7EF] px-4 py-3 text-center">
        <p className="text-[13px] font-semibold text-[#1E7A46]">
          {emailSent ? "We've emailed you the quotation." : "Your request was received."}
        </p>
        <p className="mt-1 text-[12px] text-[#1E7A46]">
          {emailSent ? "Please check your inbox and spam folder." : "Our team will follow up. The confirmation email could not be sent just now."}
        </p>
      </div>
    );
  }

  return (
    <>
      {!showGuestForm && (
        <button
          type="button"
          onClick={handleConfirmClick}
          disabled={submitting}
          className="
            mt-6
            h-[42px]
            w-full
            rounded-xl
            bg-[#202020]
            text-[13px]
            font-bold
            tracking-[2px]
            text-[#F7D38A]
            transition-all
            hover:bg-black
            disabled:opacity-60
          "
        >
          {submitting ? "SUBMITTING..." : "CONFIRM SELECTION"}
        </button>
      )}

      {showGuestForm && (
        <form onSubmit={handleGuestSubmit} className="mt-6 space-y-3">
          <p className="text-[12px] font-semibold text-[#202020]">
            A few details so our team can reach you:
          </p>

          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            value={guestInfo.name}
            onChange={handleGuestChange}
            className="w-full rounded-lg border border-[#E7CF99] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#F5A623]"
          />

          <PhoneInput
            variant="boxed"
            required
            value={guestInfo.phone}
            onChange={handleGuestPhoneChange}
            onValidityChange={setPhoneValid}
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            value={guestInfo.email}
            onChange={handleGuestChange}
            className="w-full rounded-lg border border-[#E7CF99] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#F5A623]"
          />

          {error && (
            <p className="text-[12px] font-medium text-[#E53935]">{error}</p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowGuestForm(false)}
              className="h-[38px] flex-1 rounded-lg border border-[#E7CF99] text-[12px] font-semibold text-[#202020]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-[38px] flex-1 rounded-lg bg-[#202020] text-[12px] font-bold tracking-[1px] text-[#F7D38A] disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      )}

      {error && !showGuestForm && (
        <p className="mt-2 text-center text-[12px] font-medium text-[#E53935]">
          {error}
        </p>
      )}
    </>
  );
}
