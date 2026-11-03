"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, RotateCcw, X } from "lucide-react";

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "How does RAGner combine Qdrant, RAPTOR, and Neo4j?",
  "Summarize Saransh's clinical AI and computer vision experience.",
  "Can Saransh build a custom RAG or MLOps pipeline for our team?",
];

/**
 * Editorial "Index Tab & Reading Margin" Assistant:
 * - Avoids the conventional floating bottom-right bubble.
 * - Docks as a flush vertical archival index slip on the right margin ("Ask Dossier · ⌘K").
 * - Opens as a full-height, user-resizable Reading Margin Folio that streams Markdown live from OpenRouter.
 */
export default function MarginAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync body class for smooth desktop content reflow
  useEffect(() => {
    document.body.classList.toggle("margin-open", open);
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
    return () => document.body.classList.remove("margin-open");
  }, [open]);

  // Restore saved width
  useEffect(() => {
    try {
      const saved = localStorage.getItem("saransh_margin_width");
      if (saved) {
        document.documentElement.style.setProperty("--sidebar-width", `${saved}px`);
      }
    } catch {
      // ignore
    }
  }, []);

  // Global Cmd/Ctrl+K shortcut + Navbar custom event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    const onToggle = () => setOpen((v) => !v);

    window.addEventListener("keydown", onKey);
    window.addEventListener("toggle-margin-assistant", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("toggle-margin-assistant", onToggle);
    };
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  const startResize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";

    const onMove = (ev: PointerEvent) => {
      const w = Math.min(
        Math.floor(window.innerWidth * 0.58),
        Math.max(300, window.innerWidth - ev.clientX)
      );
      document.documentElement.style.setProperty("--sidebar-width", `${w}px`);
      try {
        localStorage.setItem("saransh_margin_width", String(w));
      } catch {
        // ignore
      }
    };

    const onUp = (ev: PointerEvent) => {
      target.releasePointerCapture(ev.pointerId);
      document.body.style.userSelect = "";
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
    };

    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
  };

  const sendPrompt = async (textOverride?: string) => {
    const prompt = (textOverride ?? input).trim();
    if (!prompt || streaming) return;

    setInput("");
    const nextHistory: ChatTurn[] = [
      ...messages,
      { role: "user", content: prompt },
      { role: "assistant", content: "" },
    ];
    setMessages(nextHistory);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.slice(0, -1),
          currentPath: pathname,
        }),
      });

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.error || `Request failed with status ${res.status}`
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "The assistant is temporarily unavailable.";
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `*Note:* ${message}`,
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      {/* Flush Right-Edge Bookmarker Index Tab (Replaces generic bottom-right bubble) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open portfolio assistant margin"
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group flex items-center bg-paper-50/95 hover:bg-paper-50 border border-r-0 rule-warm border-l-2 border-l-umber-600 rounded-l-md shadow-sm px-2 py-3.5 transition-transform duration-200 hover:-translate-x-0.5"
        >
          <span
            style={{ writingMode: "vertical-rl" }}
            className="rotate-180 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-700 group-hover:text-umber-700"
          >
            Ask Portfolio · ⌘K
          </span>
        </button>
      )}

      {/* Full-Height Reading Margin Panel */}
      <aside
        aria-label="Portfolio Assistant Margin"
        style={{ width: "var(--sidebar-width)" }}
        className={`fixed top-16 right-0 bottom-0 z-40 max-w-full bg-paper-50 border-l rule-warm shadow-xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Drag Handle (Desktop) */}
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize assistant margin"
          tabIndex={0}
          onPointerDown={startResize}
          onDoubleClick={() =>
            document.documentElement.style.setProperty("--sidebar-width", "390px")
          }
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-1.5 -ml-0.5 cursor-col-resize hover:bg-umber-500/30 transition-colors"
        />

        {/* Folio Header */}
        <div className="flex-none px-5 py-3.5 border-b rule-warm bg-paper-100/70 flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-umber-600">
              Interactive Index · OpenRouter
            </div>
            <h2 className="text-sm font-medium text-ink-900">
              Ask about Saransh&apos;s work &amp; stack
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setMessages([])}
                title="Reset conversation"
                className="p-1.5 rounded hover:bg-paper-200 text-ink-500 hover:text-ink-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              title="Close margin (Esc)"
              className="p-1.5 rounded hover:bg-paper-200 text-ink-500 hover:text-ink-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Message Folio */}
        <div
          ref={listRef}
          className="flex-1 min-h-0 overflow-y-auto px-5 py-5 space-y-5 text-sm"
        >
          {messages.length === 0 ? (
            <div className="space-y-4">
              <p className="text-ink-700 leading-relaxed text-[13.5px]">
                Ask technical questions about Saransh&apos;s retrieval architectures,
                computer vision pipelines, production MLOps deployments, or
                availability for custom AI engineering work.
              </p>
              <div className="space-y-2 pt-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                  Suggested inquiries
                </div>
                {STARTER_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendPrompt(q)}
                    className="block w-full text-left p-3 rounded border rule-warm bg-paper-100/60 hover:bg-paper-100 hover:border-umber-500/50 text-xs text-ink-900 leading-snug transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                  {m.role === "user" ? "Inquiry" : "Notes"}
                </div>
                {m.role === "user" ? (
                  <div className="text-ink-900 font-medium leading-relaxed bg-paper-100/80 border rule-warm rounded px-3.5 py-2.5 text-[13.5px]">
                    {m.content}
                  </div>
                ) : (
                  <div className="assistant-prose text-ink-700 text-[13.5px] pl-3 border-l-2 border-umber-500/45">
                    {m.content ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      <span className="font-mono text-xs text-ink-400">
                        Drafting response…
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pinned Input Bar */}
        <div className="flex-none p-4 border-t rule-warm bg-paper-100/60">
          <div className="flex items-end gap-2 rounded-md bg-paper-50 border rule-warm px-3 py-2 focus-within:border-umber-600">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              disabled={streaming}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendPrompt();
                }
              }}
              placeholder="Ask about RAGner, computer vision, MLOps, or consulting..."
              className="flex-1 resize-none bg-transparent text-xs sm:text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
            />
            <button
              type="button"
              disabled={streaming || !input.trim()}
              onClick={() => sendPrompt()}
              aria-label="Send question"
              className="p-2 rounded bg-ink-900 hover:bg-umber-700 disabled:opacity-40 text-paper-50 transition-colors shrink-0"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
