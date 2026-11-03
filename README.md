# Saransh Saini — AI Engineering Portfolio (Next.js 15)

Restrained, warm archival-paper (`#F4F0E6`) portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, server-rendered **SEO + JSON-LD structured data**, **3–5s ambient video slots**, **Calendly scheduling**, and a **streaming OpenRouter Margin Assistant**.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your OPENROUTER_API_KEY and NEXT_PUBLIC_CALENDLY_URL to .env.local
npm run dev
```

Open `http://localhost:3000`.

## Key Architecture

1. **Three Non-Repetitive Routes**:
   - `/` (`src/app/page.tsx`) — Server-rendered Overview: introduction, Selected Work 3–5s loop stage, Core Areas, separate **Experience**, separate **Education**, and **Publications & Recognition**.
   - `/projects` (`src/app/projects/page.tsx`) — Filterable 8-project engineering archive with hover-activated 3–5s video slots.
   - `/consulting` (`src/app/consulting/page.tsx`) — AI engineering consulting scope, **Calendly** inline scheduler + direct booking link, and email inquiry form.
2. **Archival Margin Assistant (`src/components/MarginAssistant.tsx` + `src/app/api/chat/route.ts`)**:
   - Replaces the clichéd bottom-right chat bubble with a flush right-edge **Index Tab** (`Ask AI · ⌘K`) that opens a full-height, user-resizable **Reading Margin Folio**.
   - Streams tokens directly from OpenRouter (`stream: true`) and renders formatted Markdown (`react-markdown` + `remark-gfm`) progressively as tokens arrive.
3. **Search Engine Optimization (`"Saransh Saini"` & `"AI Engineer / AI Developer"`)**:
   - Server-rendered HTML across routes, canonical URLs, `sitemap.xml`, `robots.txt`, dynamic OpenGraph card (`src/app/opengraph-image.tsx`), and `@graph` JSON-LD (`Person`, `WebSite`, `ProfessionalService`) disambiguating your entity across GitHub, LinkedIn, ResearchGate, IIT Madras, DSEU, and RAGner.
