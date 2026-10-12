import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, loading, logout } = useAuth();

  // While we're still checking whether a saved session is valid, avoid
  // flashing a redirect to /login for someone who is actually logged in.
  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#FDF6E8] px-6 py-20">
        <p className="text-[14px] text-[#202020]">Loading...</p>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FDF6E8] px-6 py-20">
      <div className="w-full max-w-[440px] rounded-[24px] border border-[#E7CF99] bg-[#FCEBC5] p-10 shadow-[0_12px_28px_rgba(0,0,0,.10)]">
        <h1 className="text-[28px] font-bold text-[#202020]">My Account</h1>
        <p className="mt-2 text-[14px] text-[#202020]">
          Your account details.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <p className="text-[13px] font-semibold text-[#202020]">Name</p>
            <p className="mt-1 text-[14px] text-[#202020]">{user.name}</p>
          </div>

          <div>
            <p className="text-[13px] font-semibold text-[#202020]">Email</p>
            <p className="mt-1 text-[14px] text-[#202020]">{user.email}</p>
          </div>

          {user.phone && (
            <div>
              <p className="text-[13px] font-semibold text-[#202020]">
                Phone
              </p>
              <p className="mt-1 text-[14px] text-[#202020]">{user.phone}</p>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full rounded-xl bg-[#202020] py-3 text-[14px] font-bold text-[#F5C15C] transition hover:bg-black"
        >
          Log Out
        </button>
      </div>
    </section>
  );
}
