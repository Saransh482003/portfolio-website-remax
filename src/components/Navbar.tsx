"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/consulting", label: "Consulting & Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("toggle-margin-assistant"));
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-paper-100/92 backdrop-blur-md border-b rule-warm">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-lg sm:text-xl font-medium tracking-tight text-ink-900 hover:text-umber-700 transition-colors"
        >
          Saransh Saini
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm py-1 transition-colors ${
                  active
                    ? "text-ink-900 font-medium border-b border-umber-600"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={openAssistant}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded border rule-warm bg-paper-50/80 hover:border-umber-500/50 text-xs font-mono text-ink-700 transition-colors"
            title="Open portfolio assistant (Cmd/Ctrl + K)"
          >
            <span>Ask AI</span>
            <span className="text-[10px] text-ink-400">⌘ K</span>
          </button>

          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-ink-500 hover:text-ink-900 transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/consulting#contact"
            className="px-3.5 py-1.5 rounded border border-ink-900/80 bg-ink-900 text-paper-50 hover:bg-umber-700 hover:border-umber-700 text-xs tracking-wide transition-colors"
          >
            Get in Touch
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-1.5 rounded border rule-warm text-ink-700"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t rule-warm bg-paper-50 px-5 py-3 space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-ink-900"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openAssistant}
            className="block w-full text-left py-2 text-sm font-mono text-umber-700"
          >
            Open Portfolio Assistant →
          </button>
        </div>
      )}
    </header>
  );
}
