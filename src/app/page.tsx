import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { EDUCATION, EXPERIENCE } from "@/lib/portfolio-data";
import SelectedWorkStage from "@/components/SelectedWorkStage";

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* 1. Grounded Introduction */}
      <section className="max-w-3xl space-y-5">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-umber-600">
          AI Engineer · {SITE_CONFIG.location}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-ink-900 leading-[1.22] tracking-tight">
          Building retrieval systems, computer vision pipelines, and production
          machine learning software.
        </h1>
        <p className="text-base sm:text-[17px] text-ink-700 leading-[1.75]">
          I work on applied AI problems from architecture through
          deployment—designing graph- and tree-structured RAG engines over
          complex document corpora, multimodal vision and OCR workflows, and
          containerized cloud inference pipelines. Alongside independent
          research, I take on select AI engineering engagements for startups and
          technical teams.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-700">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600 hover:text-umber-700 transition-colors"
          >
            {SITE_CONFIG.email}
          </a>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600 hover:text-umber-700 transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400" />
          </a>
          <a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600 hover:text-umber-700 transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400" />
          </a>
          <a
            href={SITE_CONFIG.links.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-paper-300 underline-offset-4 hover:decoration-umber-600 hover:text-umber-700 transition-colors"
          >
            <span>ResearchGate</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-400" />
          </a>
        </div>
      </section>

      {/* 2. Selected Work with 3-5s Video Stage */}
      <section className="space-y-6 pt-2 border-t rule-warm">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pt-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-ink-900">
              Selected Work
            </h2>
            <p className="text-sm text-ink-500 mt-1">
              Representative architectures with 3–5s ambient system previews.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-umber-700 hover:underline underline-offset-4"
          >
            <span>View complete project archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <SelectedWorkStage />
      </section>

      {/* 3. Core Engineering Areas */}
      <section className="border-t rule-warm pt-12 space-y-6">
        <h2 className="text-xl sm:text-2xl font-medium text-ink-900">
          Core Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-ink-900">
              Retrieval &amp; Language Models
            </h3>
            <p className="text-sm text-ink-700 leading-relaxed">
              Multi-stage RAG, RAPTOR hierarchical summarization, and Neo4j
              Cypher knowledge graphs for complex technical, clinical, and
              enterprise documents, paired with cross-encoder re-ranking and
              structured evaluation.
            </p>
            <p className="font-mono text-[11px] text-ink-500 pt-1">
              Qdrant · Neo4j · LangChain · Cohere · Ollama
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-medium text-ink-900">
              Computer Vision &amp; Multimodal AI
            </h3>
            <p className="text-sm text-ink-700 leading-relaxed">
              Object detection, surface anomaly segmentation, monocular depth
              estimation, and OCR pipelines designed for noisy real-world field
              conditions and assistive devices.
            </p>
            <p className="font-mono text-[11px] text-ink-500 pt-1">
              PyTorch · YOLOv8 · U-Net · PaddleOCR · OpenCV
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-medium text-ink-900">
              MLOps &amp; Application Engineering
            </h3>
            <p className="text-sm text-ink-700 leading-relaxed">
              End-to-end delivery from Python training workflows to
              containerized FastAPI/Flask services on Docker and Google
              Kubernetes Engine, backed by experiment tracking, drift
              monitoring, and Next.js interfaces.
            </p>
            <p className="font-mono text-[11px] text-ink-500 pt-1">
              FastAPI · Docker · GCP (GKE) · MLflow · Evidently · Next.js
            </p>
          </div>
        </div>
      </section>

      {/* 4. Experience (Strictly Separated from Education) */}
      <section className="border-t rule-warm pt-12 space-y-8">
        <h2 className="text-xl sm:text-2xl font-medium text-ink-900">
          Experience
        </h2>

        <div className="space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={exp.role}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 ${
                idx > 0 ? "pt-6 border-t border-paper-200" : ""
              }`}
            >
              <div className="md:col-span-3 font-mono text-xs text-ink-500 pt-1">
                {exp.period}
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-medium text-ink-900">
                    {exp.role}
                  </h3>
                  {exp.orgUrl ? (
                    <a
                      href={exp.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-500 hover:text-umber-700 underline decoration-paper-300 underline-offset-4"
                    >
                      {exp.org}
                    </a>
                  ) : (
                    <span className="text-sm text-ink-500">{exp.org}</span>
                  )}
                </div>
                <ul className="space-y-1.5 text-sm text-ink-700 leading-relaxed list-disc pl-4">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Education (Strictly Separate Section) */}
      <section className="border-t rule-warm pt-12 space-y-8">
        <h2 className="text-xl sm:text-2xl font-medium text-ink-900">
          Education
        </h2>

        <div className="space-y-6">
          {EDUCATION.map((edu, idx) => (
            <div
              key={edu.institution}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 ${
                idx > 0 ? "pt-5 border-t border-paper-200" : ""
              }`}
            >
              <div className="md:col-span-3 font-mono text-xs text-ink-500 pt-0.5">
                {edu.period}
              </div>
              <div className="md:col-span-9">
                <h3 className="text-base sm:text-lg font-medium text-ink-900">
                  {edu.institution}
                </h3>
                <p className="text-sm text-ink-700 mt-0.5">{edu.degree}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Publications & Recognition */}
      <section className="border-t rule-warm pt-12 space-y-5">
        <h2 className="text-xl sm:text-2xl font-medium text-ink-900">
          Publications &amp; Recognition
        </h2>
        <div className="rounded-lg bg-paper-50 border rule-warm p-5 sm:p-6 space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-medium text-ink-900">
              CureCue: A Smart Adherence Assistant and Reminder System
            </h3>
            <span className="font-mono text-xs text-ink-500">May – Jun 2025</span>
          </div>
          <p className="text-sm text-ink-700 leading-relaxed">
            Technical report co-authored with Prof. Neelesh S. Upadhye
            (Department of Mathematics, IIT Madras) documenting an
            offline-capable medication tracking pipeline combining YOLOv8 (92.3%
            mAP@0.5), PaddleOCR, and Gemini 2.0 Flash. Recognized as Second
            Runner-Up at the BharatGen 2025 Hackathon.
          </p>
          <div className="pt-1">
            <a
              href={SITE_CONFIG.links.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-umber-700 hover:underline underline-offset-4"
            >
              <span>Read technical report on ResearchGate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
