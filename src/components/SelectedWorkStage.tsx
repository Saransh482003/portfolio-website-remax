"use client";

import { useEffect, useState } from "react";
import { FEATURED_WORK } from "@/lib/portfolio-data";
import AmbientVideoSlot from "./AmbientVideoSlot";

export default function SelectedWorkStage() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + 2.25 >= 100) {
          setIdx((cur) => (cur + 1) % FEATURED_WORK.length);
          return 0;
        }
        return prev + 2.25;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [playing]);

  const item = FEATURED_WORK[idx];

  return (
    <div className="rounded-xl bg-paper-50 border rule-warm p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-ink-900/15">
            <AmbientVideoSlot
              videoSlug={item.videoSlug}
              motionMode={item.motionMode}
              playing={playing}
              className="w-full h-full"
            />
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="px-2.5 py-1 rounded bg-black/45 hover:bg-black/65 text-paper-100 font-mono text-[10px] tracking-wider backdrop-blur-sm transition-colors"
              >
                {playing ? "Pause loop" : "Resume loop"}
              </button>
            </div>
            <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-end justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-paper-200/80">
                  {item.domain}
                </div>
                <div className="text-base sm:text-lg font-medium text-paper-50 mt-0.5">
                  {item.title}
                </div>
              </div>
              <span className="font-mono text-[10px] text-paper-200/60 shrink-0">
                4s loop
              </span>
            </div>
          </div>

          <div className="space-y-3 px-0.5">
            <p className="text-sm sm:text-[15px] text-ink-700 leading-[1.7]">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="font-mono text-[11px] text-ink-500">{item.tech}</div>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                {item.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-umber-700 hover:underline underline-offset-4 font-medium"
                  >
                    <span>{l.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-2 border-t lg:border-t-0 lg:border-l rule-warm pt-4 lg:pt-0 lg:pl-5">
          {FEATURED_WORK.map((w, i) => {
            const current = i === idx;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  setIdx(i);
                  setProgress(0);
                }}
                className={`text-left p-3.5 rounded-lg border transition-colors flex flex-col justify-between ${
                  current
                    ? "bg-paper-100 border-umber-500/45"
                    : "bg-transparent border-transparent hover:bg-paper-100/70"
                }`}
              >
                <div>
                  <div
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      current ? "text-umber-600" : "text-ink-400"
                    }`}
                  >
                    {w.domain}
                  </div>
                  <div className="text-sm sm:text-[15px] font-medium text-ink-900 mt-0.5 leading-snug">
                    {w.title.split("—")[0].trim()}
                  </div>
                  <div className="font-mono text-[11px] text-ink-500 mt-1 truncate">
                    {w.shortSub}
                  </div>
                </div>
                <div className="mt-2.5 h-[2px] w-full bg-paper-200 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-umber-600 transition-all duration-100"
                    style={{ width: `${current ? Math.min(100, progress) : 0}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
