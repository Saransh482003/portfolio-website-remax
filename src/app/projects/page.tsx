import type { Metadata } from "next";
import ProjectsArchiveClient from "@/components/ProjectsArchiveClient";

export const metadata: Metadata = {
  title: "Projects & AI Systems",
  description:
    "Engineering archive of RAG, GraphRAG, computer vision, and cloud MLOps systems built by Saransh Saini.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-umber-600">
          Engineering Archive
        </p>
        <h1 className="text-3xl sm:text-4xl font-medium text-ink-900 tracking-tight">
          Projects &amp; Systems
        </h1>
        <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
          Selected builds across retrieval-augmented generation, computer
          vision, and cloud MLOps. Hover over any project frame to preview its
          silent 3–5s ambient capture slot.
        </p>
      </div>

      <ProjectsArchiveClient />
    </div>
  );
}
