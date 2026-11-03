import { SITE_CONFIG } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t rule-warm mt-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ink-500">
        <div>© {new Date().getFullYear()} Saransh Saini</div>
        <div className="flex flex-wrap items-center gap-5 font-mono text-[11px]">
          <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-ink-900">
            Email
          </a>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-900"
          >
            GitHub
          </a>
          <a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-900"
          >
            LinkedIn
          </a>
          <a
            href={SITE_CONFIG.links.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-900"
          >
            ResearchGate
          </a>
        </div>
      </div>
    </footer>
  );
}
