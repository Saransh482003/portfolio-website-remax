"use client";

import { useState } from "react";
import { Calendar, ArrowUpRight, Check } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export default function CalendlyAndContact() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [subject, setSubject] = useState("Custom RAG / Knowledge Graph System");
  const [notes, setNotes] = useState("");
  const [showCalendlyEmbed, setShowCalendlyEmbed] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasCustomCalendly =
    SITE_CONFIG.calendlyUrl &&
    SITE_CONFIG.calendlyUrl !== "https://calendly.com/";

  const formatMessage = () =>
    `Name: ${name || "Sender"}${org ? `\nOrganization: ${org}` : ""}\nSubject: ${subject}\n\n${notes}`;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubj = encodeURIComponent(
      `${subject} — ${name.trim() || "Portfolio Inquiry"}`
    );
    const mailBody = encodeURIComponent(formatMessage());
    window.open(
      `mailto:${SITE_CONFIG.email}?subject=${mailSubj}&body=${mailBody}`,
      "_blank"
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            code: "01 · DOCUMENT INTELLIGENCE",
            title: "Custom RAG & Knowledge Graph Pipelines",
            body: "Table-preserving ingestion, hybrid vector + hierarchical RAPTOR summarization, and Neo4j entity traversal for complex PDFs, technical manuals, and clinical or legal corpora.",
            topic: "Custom RAG / Knowledge Graph System",
          },
          {
            code: "02 · PERCEPTION & OCR",
            title: "Computer Vision & Extraction Workflows",
            body: "Custom object detection (YOLO), defect and medical image segmentation (U-Net / ResNet), monocular depth pipelines, and structured OCR extraction on noisy scans.",
            topic: "Computer Vision / OCR Pipeline",
          },
          {
            code: "03 · INFRASTRUCTURE & EVALS",
            title: "MLOps Deployment & LLM Evaluation",
            body: "Containerizing ML models behind FastAPI and Docker on GCP / Kubernetes (GKE), setting up MLflow tracking and Evidently drift monitoring, and designing evaluation harnesses.",
            topic: "Production MLOps / Evaluation Engineering",
          },
        ].map((card) => (
          <div
            key={card.code}
            className="rounded-lg bg-paper-50 border rule-warm p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="font-mono text-[11px] text-umber-600">{card.code}</div>
              <h2 className="text-lg font-medium text-ink-900">{card.title}</h2>
              <p className="text-sm text-ink-700 leading-relaxed">{card.body}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubject(card.topic);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left font-mono text-xs text-umber-700 hover:underline underline-offset-4"
            >
              Scope this workflow →
            </button>
          </div>
        ))}
      </div>

      {/* Calendly Scheduling Strip */}
      <div className="rounded-lg bg-paper-50 border rule-warm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-umber-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>SCHEDULE A CALL</span>
            </div>
            <h2 className="text-xl font-medium text-ink-900">
              Book a 30-minute technical discovery call via Calendly
            </h2>
            <p className="text-sm text-ink-700">
              Prefer walking through your architecture or problem statement live? Pick a slot directly on my calendar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={SITE_CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-ink-900 hover:bg-umber-700 text-paper-50 text-xs tracking-wide transition-colors"
            >
              <span>Open Calendly</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            {hasCustomCalendly && (
              <button
                type="button"
                onClick={() => setShowCalendlyEmbed((v) => !v)}
                className="px-3.5 py-2 rounded border rule-warm hover:border-ink-500 text-xs font-mono text-ink-700 transition-colors"
              >
                {showCalendlyEmbed ? "Hide inline calendar" : "Embed calendar inline"}
              </button>
            )}
          </div>
        </div>

        {showCalendlyEmbed && hasCustomCalendly && (
          <div className="pt-3 border-t rule-warm">
            <iframe
              src={`${SITE_CONFIG.calendlyUrl}?hide_gdpr_banner=1&background_color=faf8f3&text_color=1b1917&primary_color=845026`}
              title="Schedule a call with Saransh Saini"
              className="w-full h-[640px] rounded border rule-warm bg-paper-50"
            />
          </div>
        )}
      </div>

      {/* Email Form & Direct Links */}
      <div
        id="contact"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t rule-warm"
      >
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl sm:text-2xl font-medium text-ink-900">
            Written Inquiry
          </h2>
          <p className="text-sm text-ink-700 leading-relaxed">
            If async works better, send a note below or email me directly. You can also test my live retrieval architecture at{" "}
            <a
              href={SITE_CONFIG.links.ragner}
              target="_blank"
              rel="noopener noreferrer"
              className="text-umber-700 underline underline-offset-4"
            >
              ragner.vercel.app
            </a>
            .
          </p>

          <div className="space-y-2.5 pt-2 text-sm text-ink-700">
            <div>
              <span className="font-mono text-xs text-ink-500 block">Email</span>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-ink-900 underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
            <div>
              <span className="font-mono text-xs text-ink-500 block">Links</span>
              <div className="flex flex-wrap gap-4 pt-0.5">
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600"
                >
                  GitHub
                </a>
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600"
                >
                  LinkedIn
                </a>
                <a
                  href={SITE_CONFIG.links.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600"
                >
                  ResearchGate
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-lg bg-paper-50 border rule-warm p-6">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] text-ink-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded bg-paper-100/70 border rule-warm text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-umber-600"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-ink-500 mb-1">
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Company or team"
                  className="w-full px-3 py-2 rounded bg-paper-100/70 border rule-warm text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-umber-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-ink-500 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded bg-paper-100/70 border rule-warm text-sm text-ink-900 focus:outline-none focus:border-umber-600"
              >
                <option value="Custom RAG / Knowledge Graph System">
                  Custom RAG / Knowledge Graph System
                </option>
                <option value="Computer Vision / OCR Pipeline">
                  Computer Vision / OCR Pipeline
                </option>
                <option value="Production MLOps / Evaluation Engineering">
                  Production MLOps / Evaluation Engineering
                </option>
                <option value="Engineering Role / Full-Time Opportunity">
                  Engineering Role / Full-Time Opportunity
                </option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-ink-500 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share a brief overview of your project, data context, or role."
                className="w-full px-3 py-2 rounded bg-paper-100/70 border rule-warm text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-umber-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-ink-900 hover:bg-umber-700 text-paper-50 text-xs tracking-wide transition-colors"
              >
                Send via Email
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border rule-warm hover:border-ink-500 text-xs font-mono text-ink-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-umber-600" /> : null}
                <span>{copied ? "Copied" : "Copy message text"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
