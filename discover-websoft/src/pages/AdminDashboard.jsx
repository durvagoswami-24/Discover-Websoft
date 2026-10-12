import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchQuotations,
  updateQuotationStatus,
  clearAdminToken,
} from "../api/admin";
import AdminChatPanel from "../components/admin/AdminChatPanel";
import QuotationActionsModal from "../components/admin/QuotationActionsModal";

const STATUS_STYLES = {
  pending: "bg-[#FDECC8] text-[#8A6D1E]",
  contacted: "bg-[#DCEBFB] text-[#1D5A96]",
  converted: "bg-[#DDF3E4] text-[#1E7A46]",
  closed: "bg-[#EDEDED] text-[#5b5b5b]",
};

const STATUS_OPTIONS = ["pending", "contacted", "converted", "closed"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);
  const [chatQuotation, setChatQuotation] = useState(null);
  const [actionsQuotation, setActionsQuotation] = useState(null);

  const loadQuotations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchQuotations();
      setQuotations(data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin/login");
        return;
      }
      setError(
        err.response?.data?.message || "Could not load quotations."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadQuotations();
  }, [loadQuotations]);

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    try {
      const updated = await updateQuotationStatus(id, status);
      setQuotations((prev) =>
        prev.map((q) => (q._id === id ? updated : q))
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not update status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login");
  }

  const visibleQuotations =
    statusFilter === "all"
      ? quotations
      : quotations.filter((q) => q.status === statusFilter);

  return (
    <section className="min-h-screen bg-[#FDF6E8] px-6 py-10 md:px-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-extrabold text-[#202020]">
              Quote Requests
            </h1>
            <p className="mt-1 text-[13px] text-[#5b5140]">
              {quotations.length} total request
              {quotations.length === 1 ? "" : "s"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="h-[42px] rounded-xl border border-[#202020] px-5 text-[13px] font-semibold text-[#202020] hover:bg-black/5"
          >
            Log Out
          </button>
        </div>

        {/* Status filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["all", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-4 py-1.5 text-[12px] font-semibold capitalize transition ${
                statusFilter === s
                  ? "bg-[#202020] text-[#F5C15C]"
                  : "bg-white text-[#5b5140] hover:bg-black/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-[#FBE7E5] px-4 py-3 text-[13px] font-medium text-[#C0392B]">
            {error}
          </p>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#E7CF99] bg-white">
          {loading ? (
            <p className="p-8 text-center text-[14px] text-[#5b5140]">
              Loading...
            </p>
          ) : visibleQuotations.length === 0 ? (
            <p className="p-8 text-center text-[14px] text-[#5b5140]">
              No quote requests here yet.
            </p>
          ) : (
            <table className="w-full min-w-[820px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#F0E6CF] bg-[#FDF6E8] text-[11px] uppercase tracking-[1px] text-[#8a7c5c]">
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Service / Plan</th>
                  <th className="px-5 py-3">Grand Total</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {visibleQuotations.map((q) => (
                  <tr
                    key={q._id}
                    className="border-b border-[#F5EEDB] last:border-0"
                  >
                    <td className="px-5 py-4 align-top text-[#5b5140]">
                      {new Date(q.createdAt).toLocaleDateString()}
                      <div className="text-[11px] text-[#a89a7c]">
                        {new Date(q.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-[#202020]">
                        {q.user?.name || q.customerName || "Guest"}
                      </div>
                      <div className="text-[12px] text-[#5b5140]">
                        {q.user?.email || q.customerEmail || "-"}
                      </div>
                      <div className="text-[12px] text-[#5b5140]">
                        {q.user?.phone || q.customerPhone || "-"}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="font-medium text-[#202020]">
                        {q.serviceSlug}
                      </div>
                      <div className="text-[12px] text-[#5b5140]">
                        {q.planName || q.planSlug}
                      </div>
                      <div className="text-[11px] uppercase text-[#a89a7c]">
                        {q.quotationType}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top font-semibold text-[#202020]">
                      {q.grandTotal ? `₹${q.grandTotal.toLocaleString()}` : "-"}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <select
                        value={q.status}
                        disabled={updatingId === q._id}
                        onChange={(e) =>
                          handleStatusChange(q._id, e.target.value)
                        }
                        className={`rounded-full border-0 px-3 py-1.5 text-[12px] font-semibold capitalize outline-none disabled:opacity-60 ${
                          STATUS_STYLES[q.status] || STATUS_STYLES.pending
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setChatQuotation(q)}
                          className="rounded-lg border border-[#E7CF99] px-3 py-1.5 text-[12px] font-semibold text-[#202020] hover:bg-black/5"
                        >
                          Message
                        </button>
                        <button
                          onClick={() => setActionsQuotation(q)}
                          className="rounded-lg bg-[#202020] px-3 py-1.5 text-[12px] font-semibold text-[#F5C15C] hover:bg-black"
                        >
                          Quotation
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {chatQuotation && (
        <AdminChatPanel
          quotation={chatQuotation}
          onClose={() => setChatQuotation(null)}
        />
      )}

      {actionsQuotation && (
        <QuotationActionsModal
          quotation={actionsQuotation}
          onClose={() => setActionsQuotation(null)}
          onSent={(updated) => {
            setActionsQuotation(updated);
            setQuotations((prev) =>
              prev.map((q) => (q._id === updated._id ? updated : q))
            );
          }}
        />
      )}
    </section>
  );
}
