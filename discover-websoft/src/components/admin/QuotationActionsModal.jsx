import { useState } from "react";
import { HiX } from "react-icons/hi";
import { sendQuotationToCustomer, downloadQuotationPdf } from "../../api/admin";

// Two-column panel for a single quotation: send it to the customer
// (with an optional note), or download the PDF locally. Kept separate
// from AdminChatPanel, which is a different, unrelated feature.
export default function QuotationActionsModal({ quotation, onClose, onSent }) {
  const customerEmail = quotation.user?.email || quotation.customerEmail;

  const [note, setNote] = useState(quotation.adminNote || "");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  async function handleSend() {
    setSending(true);
    setSendError("");
    setSendSuccess(false);
    try {
      const updated = await sendQuotationToCustomer(quotation._id, note);
      setSendSuccess(true);
      onSent?.(updated);
    } catch (err) {
      setSendError(
        err.response?.data?.message || "Could not send the quotation."
      );
    } finally {
      setSending(false);
    }
  }

  async function handleDownload() {
    setDownloading(true);
    setDownloadError("");
    try {
      await downloadQuotationPdf(quotation._id);
    } catch (err) {
      setDownloadError(
        err.response?.data?.message || "Could not download the PDF."
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[680px] overflow-hidden rounded-[20px] border border-[#E7CF99] bg-[#FDF6E8] shadow-[0_20px_45px_rgba(0,0,0,.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7CF99] bg-[#F3DDB2] px-6 py-4">
          <div>
            <p className="text-[15px] font-bold text-[#202020]">
              {quotation.planName || quotation.planSlug}
            </p>
            <p className="text-[12px] text-[#5b5140]">
              {quotation.user?.name || quotation.customerName || "Guest"}
              {quotation.lastSentAt && (
                <>
                  {" "}
                  &middot; Last sent{" "}
                  {new Date(quotation.lastSentAt).toLocaleString()}
                </>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#5b5140] hover:text-[#202020]"
            aria-label="Close"
          >
            <HiX size={20} />
          </button>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 divide-y divide-[#E7CF99] sm:grid-cols-2 sm:divide-x sm:divide-y-0">

          {/* LEFT -- Send to customer */}
          <div className="p-6">
            <h3 className="text-[14px] font-bold text-[#202020]">
              Send to Customer
            </h3>
            <p className="mt-1 text-[12px] text-[#5b5140]">
              {customerEmail
                ? `Emails the quotation + T&C to ${customerEmail}.`
                : "No customer email on file -- can't send."}
            </p>

            <label className="mt-4 block text-[12px] font-semibold text-[#202020]">
              Additional Note
              <span className="font-normal text-[#8a7c5c]">
                {" "}(optional -- from any discussion with the customer)
              </span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
              placeholder="e.g. Discussed on call -- customer wants the premium tier with an extra revision round."
              className="mt-2 w-full resize-none rounded-xl border border-[#E7CF99] bg-white px-3 py-2.5 text-[13px] text-[#202020] outline-none placeholder:text-[#a89a7c] focus:border-[#202020]"
            />

            {sendError && (
              <p className="mt-2 text-[12px] font-medium text-[#C0392B]">
                {sendError}
              </p>
            )}
            {sendSuccess && (
              <p className="mt-2 text-[12px] font-medium text-[#1E7A46]">
                Sent successfully.
              </p>
            )}

            <button
              onClick={handleSend}
              disabled={sending || !customerEmail}
              className="mt-4 w-full rounded-xl bg-[#202020] py-2.5 text-[13px] font-bold text-[#F5C15C] transition hover:bg-black disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Quotation"}
            </button>
          </div>

          {/* RIGHT -- Download */}
          <div className="p-6">
            <h3 className="text-[14px] font-bold text-[#202020]">
              Download Quotation
            </h3>
            <p className="mt-1 text-[12px] text-[#5b5140]">
              Saves the quotation PDF to this device, without emailing
              anyone. Includes the saved note above, if any.
            </p>

            {quotation.adminNote && (
              <div className="mt-4 rounded-xl border border-[#E7CF99] bg-white px-3 py-2.5 text-[12px] text-[#5b5140]">
                <span className="font-semibold text-[#202020]">
                  Saved note:
                </span>{" "}
                {quotation.adminNote}
              </div>
            )}

            {downloadError && (
              <p className="mt-2 text-[12px] font-medium text-[#C0392B]">
                {downloadError}
              </p>
            )}

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="mt-4 w-full rounded-xl border border-[#202020] py-2.5 text-[13px] font-bold text-[#202020] transition hover:bg-black/5 disabled:opacity-50"
            >
              {downloading ? "Downloading..." : "Download PDF"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
