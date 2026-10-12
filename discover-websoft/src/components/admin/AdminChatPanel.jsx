import { useState } from "react";
import { HiX, HiPaperClip, HiPaperAirplane } from "react-icons/hi";

// Matches the Figma chat panel that follows the Admin Login screen.
//
// NOTE: this is UI-only for now. Messages live in local component state
// and are NOT sent anywhere or persisted -- there's no backend Message
// model/route yet. Once the exact behaviour (who it notifies, whether
// it's tied to email, whether customers see replies, etc.) is confirmed,
// this can be wired to a real endpoint without changing the layout.
export default function AdminChatPanel({ quotation, onClose }) {
  const customerName =
    quotation.user?.name || quotation.customerName || "Guest";

  const initialMessage =
    quotation.details?.note ||
    `Please provide the latest mockups for the ${
      quotation.planName || quotation.planSlug
    } module.`;

  const [messages, setMessages] = useState(() => [
    {
      id: "seed",
      from: "customer",
      text: initialMessage,
      time: quotation.createdAt ? new Date(quotation.createdAt) : new Date(),
    },
  ]);
  const [draft, setDraft] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        from: "admin",
        text: draft.trim(),
        time: new Date(),
      },
    ]);
    setDraft("");
  };

  const formattedDate = messages[0].time.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-end bg-black/30 p-4 sm:items-center sm:justify-center"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[380px] flex-col overflow-hidden rounded-[20px] border border-[#E7CF99] bg-[#F3DDB2] shadow-[0_20px_45px_rgba(0,0,0,.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7CF99]/70 px-5 py-3">
          <div>
            <p className="text-[13px] font-semibold text-[#5b5140]">
              {formattedDate}, {messages[0].time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-[12px] text-[#8a7c5c]">{customerName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#5b5140] hover:text-[#202020]"
            aria-label="Close"
          >
            <HiX size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex max-h-[360px] min-h-[200px] flex-col gap-3 overflow-y-auto px-5 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-[20px] ${
                m.from === "customer"
                  ? "self-start bg-[#EAD3A0] text-[#202020]"
                  : "self-end bg-[#202020] text-[#F5C15C]"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input row */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-[#E7CF99]/70 bg-[#F0D5A0] px-4 py-3"
        >
          <button
            type="button"
            className="text-[#5b5140] hover:text-[#202020]"
            aria-label="Attach file"
          >
            <HiPaperClip size={18} />
          </button>

          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-[#D3B98A] bg-[#F8E8C8] px-4 py-2.5 text-[13px] text-[#202020] outline-none placeholder:text-[#8a7c5c] focus:border-[#202020]"
          />

          <button
            type="submit"
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#202020] text-[#F5C15C] transition hover:bg-black"
            aria-label="Send message"
          >
            <HiPaperAirplane size={15} className="rotate-90" />
          </button>
        </form>
      </div>
    </div>
  );
}
