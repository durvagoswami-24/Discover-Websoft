import { useState } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      // Send them back to whatever page they were on before being
      // asked to log in, or home if they landed here directly.
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Already logged in -- no need to show the login form again.
  if (user) {
    return <Navigate to="/account" replace />;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FDF6E8] px-6 py-20">
      <div className="w-full max-w-[440px] rounded-[24px] border border-[#E7CF99] bg-[#FCEBC5] p-10 shadow-[0_12px_28px_rgba(0,0,0,.10)]">

        <h1 className="text-[28px] font-bold text-[#202020]">Log In</h1>
        <p className="mt-2 text-[14px] text-[#202020]">
          Welcome back. Enter your details to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-[#202020]">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#E7CF99] bg-[#FDF0D2] px-4 py-3 text-[14px] outline-none focus:border-[#F5A623]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#202020]">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#E7CF99] bg-[#FDF0D2] px-4 py-3 text-[14px] outline-none focus:border-[#F5A623]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[13px] font-medium text-[#E53935]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#202020] py-3 text-[14px] font-bold text-[#F5C15C] transition hover:bg-black disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-[#202020]">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-[#D98E2B]">
            Register
          </Link>
        </p>

      </div>
    </section>
  );
}
