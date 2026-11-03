"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { PROJECTS_ARCHIVE } from "@/lib/portfolio-data";
import AmbientVideoSlot from "./AmbientVideoSlot";

const CATEGORIES = [
  { id: "all", label: `All (${PROJECTS_ARCHIVE.length})` },
  { id: "rag", label: "Retrieval & NLP" },
  { id: "cv", label: "Computer Vision" },
  { id: "mlops", label: "MLOps & Platforms" },
] as const;

export default function ProjectsArchiveClient() {
  const [cat, setCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = PROJECTS_ARCHIVE.filter((p) => {
    const catOk = cat === "all" || p.category === cat;
    const qOk =
      !q ||
      `${p.title} ${p.domain} ${p.summary} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(q);
    return catOk && qOk;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b rule-warm">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                cat === c.id
                  ? "bg-ink-900 text-paper-50"
                  : "text-ink-700 hover:bg-paper-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[230px]">
          <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by Neo4j, PyTorch, GKE..."
            className="w-full pl-8 pr-3 py-1.5 rounded bg-paper-50 border rule-warm text-xs font-mono text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-umber-600"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center rounded-lg bg-paper-50 border rule-warm text-sm text-ink-500">
          No matching projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filtered.map((p) => (
            <article
              key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group rounded-lg bg-paper-50 border rule-warm overflow-hidden flex flex-col justify-between transition-colors hover:border-umber-500/45"
            >
              <div className="relative aspect-video border-b rule-warm">
                <AmbientVideoSlot
                  videoSlug={p.videoSlug}
                  motionMode={p.motionMode}
                  playing={hoveredId === p.id}
                  className="w-full h-full"
                />
                <div className="absolute top-3 left-3.5 right-3.5 z-10 flex items-center justify-between font-mono text-[10px] text-paper-200/75">
                  <span>{p.domain}</span>
                  <span>{p.date}</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-ink-900 leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-sm text-ink-700 leading-relaxed">{p.summary}</p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-paper-100 border rule-warm font-mono text-[10px] text-ink-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2 border-t border-paper-200 text-xs font-mono text-umber-700">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
