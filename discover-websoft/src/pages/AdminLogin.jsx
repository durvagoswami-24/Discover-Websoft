import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff, HiOutlineShieldCheck } from "react-icons/hi";
import { adminLoginRequest, setAdminToken, getAdminToken } from "../api/admin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showLockoutInfo, setShowLockoutInfo] = useState(false);
const [securityKey, setSecurityKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Already have a valid-looking admin session -- skip straight to the
  // dashboard rather than showing the login form again.
  if (getAdminToken()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = await adminLoginRequest(securityKey);
      setAdminToken(token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid security key. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#EDEDED] px-6 py-20">
      <div className="w-full max-w-[400px] rounded-[24px] border border-[#DCC79A] bg-[#E6CFA3] p-9 shadow-[0_20px_45px_rgba(0,0,0,.12)]">
        {/* Icon */}
        <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-2xl bg-[#202020]">
          <HiOutlineShieldCheck className="text-[30px] text-white" />
        </div>

        {/* Title */}
        <h1 className="mt-5 text-center text-[26px] font-extrabold text-[#202020]">
          Admin Login
        </h1>
        <p className="mt-1 text-center text-[13px] text-[#5b5140]">
          Restricted access for authorised person only.
        </p>

        <form onSubmit={handleSubmit} className="mt-7">
          <label className="block text-[11px] font-bold uppercase tracking-[1.5px] text-[#4a4232]">
            Security Key
          </label>

          <div className="relative mt-2">
            <input
              type={showKey ? "text" : "password"}
              required
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              placeholder="Enter credentials..."
              className="w-full rounded-xl border border-[#D3B98A] bg-white px-4 py-3 pr-11 text-[14px] text-[#202020] outline-none placeholder:text-[#a89a7c] focus:border-[#202020]"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a7c5c] hover:text-[#202020]"
              aria-label={showKey ? "Hide security key" : "Show security key"}
            >
              {showKey ? <HiEyeOff size={18} /> : <HiEye size={18} />}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-[13px] font-medium text-[#C0392B]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 h-[48px] w-full rounded-xl bg-[#1F1F1F] text-[14px] font-bold tracking-[1.5px] text-[#F5C15C] transition hover:bg-black disabled:opacity-60"
          >
            {submitting ? "UNLOCKING..." : "UNLOCK"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-3 h-[48px] w-full rounded-xl border border-[#4a4232] text-[14px] font-bold text-[#202020] transition hover:bg-black/5"
          >
            CANCEL
          </button>
        </form>

        <p
          onClick={() => setShowLockoutInfo((v) => !v)}
          className="mt-5 cursor-pointer text-center text-[12px] text-[#6b5f47] underline decoration-dotted"
        >
          Emergency Lockout?
        </p>

        {showLockoutInfo && (
          <p className="mt-3 rounded-lg bg-black/5 px-4 py-3 text-center text-[12px] text-[#4a4232]">
            If you believe access has been compromised, contact your system
            administrator to rotate the security key immediately.
          </p>
        )}
      </div>
    </section>
  );
}
