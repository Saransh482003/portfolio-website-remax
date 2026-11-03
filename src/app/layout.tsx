import type { Metadata } from "next";
import { Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarginAssistant from "@/components/MarginAssistant";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: "%s | Saransh Saini",
  },
  description:
    "Saransh Saini is an AI Engineer building multi-layer RAG systems, Neo4j knowledge graphs, computer vision pipelines, and production MLOps software. Available for AI development and technical consulting.",
  keywords: [
    "Saransh Saini",
    "Saransh Saini AI Engineer",
    "Saransh Saini IIT Madras",
    "AI Developer",
    "AI Engineering Consultant",
    "Custom RAG Developer",
    "GraphRAG Neo4j Engineer",
    "Computer Vision Engineer India",
    "RAGner",
  ],
  authors: [{ name: "Saransh Saini", url: SITE_CONFIG.url }],
  creator: "Saransh Saini",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: "Saransh Saini",
    title: SITE_CONFIG.title,
    description:
      "AI Engineer specializing in retrieval architectures (RAG, RAPTOR, GraphRAG), computer vision, and production MLOps.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description:
      "AI Engineer specializing in retrieval architectures, computer vision, and production MLOps.",
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/#person`,
      name: "Saransh Saini",
      jobTitle: "AI Engineer",
      url: SITE_CONFIG.url,
      email: `mailto:${SITE_CONFIG.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressCountry: "IN",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Indian Institute of Technology Madras",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Delhi Skill and Entrepreneurship University",
        },
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Retrieval-Augmented Generation",
        "Knowledge Graphs",
        "Neo4j",
        "Qdrant",
        "Computer Vision",
        "PyTorch",
        "MLOps",
      ],
      sameAs: [
        SITE_CONFIG.links.github,
        SITE_CONFIG.links.linkedin,
        SITE_CONFIG.links.ragner,
        SITE_CONFIG.links.researchGate,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: "Saransh Saini — AI Engineer",
      publisher: { "@id": `${SITE_CONFIG.url}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_CONFIG.url}/#consulting`,
      name: "Saransh Saini — AI Engineering & Development Services",
      url: `${SITE_CONFIG.url}/consulting`,
      founder: { "@id": `${SITE_CONFIG.url}/#person` },
      areaServed: "Worldwide",
      serviceType: [
        "Custom Retrieval-Augmented Generation (RAG) & GraphRAG Development",
        "Computer Vision & OCR Pipeline Engineering",
        "Production MLOps & Cloud Inference Deployment",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="paper-texture font-serif min-h-screen selection:bg-umber-100 selection:text-umber-700">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <div className="portfolio-shell min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-5xl w-full mx-auto px-5 sm:px-8 py-12 sm:py-16">
            {children}
          </main>
          <Footer />
        </div>
        <MarginAssistant />
      </body>
    </html>
  );
}
