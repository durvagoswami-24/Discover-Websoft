import { useState } from "react";
import { HiX, HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { submitQuotationRequest } from "../../api/quotation";
import PhoneInput from "../PhoneInput";

// Business WhatsApp number for the "Chat on WhatsApp" button below.
// wa.me links need the number with country code, digits only (no +,
// spaces, or dashes).
const WHATSAPP_NUMBER = "917489963385";

// Lightweight lead-capture modal opened from the "Get Quote" button on a
// plan page. Distinct from the full pricing "Confirm Selection" flow --
// this is just Name/Number/Email, meant to start a conversation rather
// than lock in a specific configuration.
// Simple, standard email format check -- good enough to catch typos
// like missing "@" or "." without being overly strict about edge cases.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function GetQuoteModal({ service, plan, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });
  const [phoneValid, setPhoneValid] = useState(Boolean(user?.phone));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phoneValid) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const result = await submitQuotationRequest({
        serviceSlug: service.slug,
        planSlug: plan.slug,
        planName: plan.name,
        quotationType: "quick_quote",
        planPrice: plan.price,
        details: { note: "Requested via Get Quote button" },
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
      });
      setEmailSent(result.customerEmailSent === true);
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

  const handleReturnHome = () => {
    onClose();
    navigate("/");
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I just requested a quote for ${plan?.name || "a plan"} (${
      service?.title || "your services"
    }). I'd like to know more.`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] overflow-hidden rounded-[24px] border border-white/40 bg-[#F3D9A6] shadow-[0_20px_45px_rgba(0,0,0,.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#F3C77E] to-[#F0BE6E] px-7 pb-7 pt-6">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-[#5c4a2a] transition hover:text-[#202020]"
            aria-label="Close"
          >
            <HiX size={22} />
          </button>

          <h2 className="text-[26px] font-extrabold text-[#202020]">
            Get Quote
          </h2>
          <p className="mt-2 text-[14px] leading-[20px] text-[#3a3226]">
            Precision requires conversation. Leave your details.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 pb-7 pt-6">
          {success ? (
            <div className="rounded-xl border border-[#E7CF99] bg-[#FFF9ED] px-4 py-4 text-center">
              <p className="text-[14px] font-semibold text-[#9B6C12]">
                {emailSent ? "We've emailed you the quotation." : "Your request was received."}
              </p>
              <p className="mt-1 text-[13px] text-[#4F4A40]">
                {emailSent ? "Please check your inbox and spam folder." : "Our team will follow up. The confirmation email could not be sent just now."}
              </p>
              <button
                onClick={handleReturnHome}
                className="mt-5 h-[46px] w-full rounded-full border border-[#202020] text-[13px] font-bold tracking-[0.5px] text-[#202020] transition hover:bg-black/5"
              >
                Return to Homepage
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#202020] text-[13px] font-bold tracking-[0.5px] text-[#F7D38A] transition hover:bg-black"
              >
                Chat on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-[#6b5a3a]">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-2 w-full border-b border-[#C9A968] bg-transparent pb-2 text-[15px] text-[#202020] outline-none placeholder:text-[#8a7a55] focus:border-[#202020]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-[#6b5a3a]">
                  Number
                </label>
                <div className="mt-2">
                  <PhoneInput
                    variant="underline"
                    required
                    value={form.phone}
                    onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                    onValidityChange={setPhoneValid}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-[#6b5a3a]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className="mt-2 w-full border-b border-[#C9A968] bg-transparent pb-2 text-[15px] text-[#202020] outline-none placeholder:text-[#8a7a55] focus:border-[#202020]"
                />
              </div>

              {error && (
                <p className="text-[13px] font-medium text-[#E53935]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#202020] text-[14px] font-bold tracking-[1px] text-white transition hover:bg-black disabled:opacity-60"
              >
                {submitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
                {!submitting && <HiArrowRight size={16} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
