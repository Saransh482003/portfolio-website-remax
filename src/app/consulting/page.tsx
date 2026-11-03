import type { Metadata } from "next";
import CalendlyAndContact from "@/components/CalendlyAndContact";

export const metadata: Metadata = {
  title: "AI Engineering Services & Contact",
  description:
    "Work with Saransh Saini on custom Retrieval-Augmented Generation (RAG), Neo4j GraphRAG, computer vision pipelines, and production MLOps deployments.",
  alternates: { canonical: "/consulting" },
};

export default function ConsultingPage() {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-umber-600">
          Advisory &amp; Development
        </p>
        <h1 className="text-3xl sm:text-4xl font-medium text-ink-900 tracking-tight">
          AI Engineering Consulting &amp; Contact
        </h1>
        <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
          I work directly with founders, product teams, and researchers to take
          applied AI workflows from initial data exploration into clean,
          maintainable production services—with full repository and
          infrastructure ownership handed over to your team.
        </p>
      </div>

      <CalendlyAndContact />
    </div>
  );
}
