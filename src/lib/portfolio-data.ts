export type MotionMode = "graph" | "tree" | "scan" | "depth";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface FeaturedProject {
  id: string;
  domain: string;
  title: string;
  shortSub: string;
  description: string;
  tech: string;
  videoSlug: string;
  motionMode: MotionMode;
  links: ProjectLink[];
}

export interface ArchiveProject {
  id: string;
  category: "rag" | "cv" | "mlops";
  date: string;
  title: string;
  domain: string;
  videoSlug: string;
  motionMode: MotionMode;
  summary: string;
  tags: string[];
  links: ProjectLink[];
}

export const FEATURED_WORK: FeaturedProject[] = [
  {
    id: "ragner",
    domain: "Multi-Layer Retrieval Architecture",
    title: "RAGner — Tri-Modal Document & Graph Retrieval",
    shortSub: "Qdrant · RAPTOR · Neo4j · Cohere Rerank",
    description:
      "An open-architecture retrieval framework designed for multi-hop technical and enterprise queries where flat vector similarity falls short. Combines isolated Qdrant vector namespaces, RAPTOR hierarchical tree clustering, and Neo4j Cypher knowledge graphs with cross-encoder re-ranking. Deployed with an open workspace and pre-indexed domain corpora so teams can inspect its retrieval behavior firsthand.",
    tech: "Python · FastAPI · Next.js · Qdrant · Neo4j · Unstructured.io",
    videoSlug: "ragner",
    motionMode: "graph",
    links: [
      { label: "Explore live workspace", url: "https://ragner.vercel.app/" },
      { label: "GitHub", url: "https://github.com/Saransh482003" },
    ],
  },
  {
    id: "vasccoach",
    domain: "Biomedical NLP · HTIC IIT Madras",
    title: "VascCoach — Clinical Literature RAPTOR & GraphRAG",
    shortSub: "Hierarchical Summarization over 70+ Clinical Papers",
    description:
      "Built during my internship at the Healthcare Technology Innovation Centre to synthesize over 70 peer-reviewed vascular aging studies and clinical device manuals. Uses hierarchical tree summarization alongside a Neo4j entity graph, achieving ~70% precision on a 50-question clinical evaluation benchmark.",
    tech: "Python · RAPTOR · Neo4j · Clinical NLP · LLMs",
    videoSlug: "vasccoach",
    motionMode: "tree",
    links: [
      {
        label: "View clinical RAG demo",
        url: "https://ragner.vercel.app/explore?bot=triomics",
      },
    ],
  },
  {
    id: "curecue",
    domain: "Assistive Computer Vision & OCR",
    title: "CureCue — Offline-First Medication Adherence System",
    shortSub: "YOLOv8 (92.3% mAP@0.5) · PaddleOCR · Gemini 2.0 Flash",
    description:
      "A mobile assistive pipeline for elderly and visually impaired users that detects medicine packaging expiry dates in under 0.9s using a custom-trained YOLOv8 detector (92.3% mAP@0.5 across ~1,700 images), extracts labels via PaddleOCR (93% clear-region accuracy), and parses spoken schedules.",
    tech: "PyTorch · Ultralytics YOLOv8 · PaddleOCR · Flutter · Flask",
    videoSlug: "curecue",
    motionMode: "scan",
    links: [
      {
        label: "ResearchGate report",
        url: "https://www.researchgate.net/publication/392194582_CureCue_A_Smart_Adherence_Assistant_and_Reminder_System",
      },
      { label: "GitHub", url: "https://github.com/Saransh482003" },
    ],
  },
  {
    id: "navigation",
    domain: "Spatial Perception & Accessibility",
    title: "Action-Oriented Indoor Navigation Assistance",
    shortSub: "YOLO Obstacle Detection · Depth Anything V2 · MPRNet",
    description:
      "An end-to-end indoor perception pipeline built to assist visually impaired navigation. Integrates MPRNet image restoration and CLAHE contrast recovery to handle motion blur and poor lighting before fusing YOLO object localization with Depth Anything V2 monocular depth maps.",
    tech: "PyTorch · YOLO · Depth Anything V2 · MPRNet · OpenCV",
    videoSlug: "navigation",
    motionMode: "depth",
    links: [{ label: "GitHub", url: "https://github.com/Saransh482003" }],
  },
];

export const PROJECTS_ARCHIVE: ArchiveProject[] = [
  {
    id: "ragner",
    category: "rag",
    date: "Sep 2026",
    title: "RAGner: Tri-Modal Retrieval Framework",
    domain: "Retrieval & Knowledge Graphs",
    videoSlug: "ragner",
    motionMode: "graph",
    summary:
      "Integrates Qdrant vector search, RAPTOR recursive tree summarization, and Neo4j Cypher traversal behind an intent router and cross-encoder re-ranker, containerized on FastAPI and Next.js.",
    tags: ["Qdrant", "Neo4j", "RAPTOR", "FastAPI", "Next.js"],
    links: [
      { label: "Live workspace", url: "https://ragner.vercel.app/" },
      { label: "Source", url: "https://github.com/Saransh482003" },
    ],
  },
  {
    id: "vasccoach",
    category: "rag",
    date: "Dec 2025",
    title: "VascCoach: Biomedical RAPTOR & GraphRAG",
    domain: "Clinical NLP · HTIC",
    videoSlug: "vasccoach",
    motionMode: "tree",
    summary:
      "Hierarchical tree-summarized retrieval and Neo4j knowledge graph over 70+ vascular aging research papers and medical device manuals, evaluated across 50 domain-specific queries.",
    tags: ["RAPTOR", "Neo4j", "Python", "Biomedical NLP"],
    links: [
      {
        label: "Clinical demo instance",
        url: "https://ragner.vercel.app/explore?bot=triomics",
      },
    ],
  },
  {
    id: "curecue",
    category: "cv",
    date: "Jun 2025",
    title: "CureCue: Medication Adherence Assistant",
    domain: "Computer Vision & Multimodal",
    videoSlug: "curecue",
    motionMode: "scan",
    summary:
      "Combines YOLOv8 expiry localization (92.3% mAP@0.5), PaddleOCR medicine extraction (93% accuracy), and voice scheduling in an offline-first mobile architecture. Second Runner-Up, BharatGen 2025.",
    tags: ["YOLOv8", "PaddleOCR", "Gemini 2.0 Flash", "Flutter", "Flask"],
    links: [
      {
        label: "ResearchGate paper",
        url: "https://www.researchgate.net/publication/392194582_CureCue_A_Smart_Adherence_Assistant_and_Reminder_System",
      },
      { label: "Source", url: "https://github.com/Saransh482003" },
    ],
  },
  {
    id: "navigation",
    category: "cv",
    date: "Mar – Apr 2026",
    title: "Indoor Navigation Assistance Pipeline",
    domain: "Monocular Depth & Detection",
    videoSlug: "navigation",
    motionMode: "depth",
    summary:
      "Fuses MPRNet image denoising/deblurring and CLAHE preprocessing with YOLO object detection and Depth Anything V2 monocular depth estimation for indoor obstacle guidance.",
    tags: ["PyTorch", "YOLO", "Depth Anything V2", "MPRNet", "OpenCV"],
    links: [{ label: "Source", url: "https://github.com/Saransh482003" }],
  },
  {
    id: "heart-mlops",
    category: "mlops",
    date: "Aug 2025",
    title: "Heart Disease Classification MLOps Pipeline",
    domain: "Cloud Inference & Drift Monitoring",
    videoSlug: "heart-mlops",
    motionMode: "tree",
    summary:
      "Production classification service containerized with Docker and orchestrated on Google Kubernetes Engine (GKE), featuring MLflow experiment tracking and Evidently AI data-drift monitoring.",
    tags: ["GCP (GKE)", "Docker", "Flask", "MLflow", "Evidently AI"],
    links: [{ label: "Source", url: "https://github.com/Saransh482003" }],
  },
  {
    id: "defect-seg",
    category: "cv",
    date: "2026",
    title: "Industrial Surface Defect Segmentation",
    domain: "Visual Inspection",
    videoSlug: "defect-seg",
    motionMode: "scan",
    summary:
      "Multi-class surface anomaly localization and segmentation pipeline built with PyTorch and segmentation-models-pytorch using a U-Net architecture with a ResNet34 backbone and Albumentations.",
    tags: ["PyTorch", "U-Net", "ResNet34", "Albumentations"],
    links: [
      { label: "GitHub profile", url: "https://github.com/Saransh482003" },
    ],
  },
  {
    id: "tasim",
    category: "rag",
    date: "Sep 2025",
    title: "TA-Sim: Technical Interview Simulator",
    domain: "Lecture-Grounded RAG",
    videoSlug: "tasim",
    motionMode: "graph",
    summary:
      "Automated technical viva simulator built with Next.js, Flask, ChromaDB, and Ollama (Llama 3) with text-to-speech interaction to evaluate responses against course lecture material.",
    tags: ["Next.js", "Flask", "ChromaDB", "Ollama (Llama 3)"],
    links: [{ label: "Source", url: "https://github.com/Saransh482003" }],
  },
  {
    id: "htic-systems",
    category: "mlops",
    date: "Jul – Oct 2025",
    title: "SCS Organ Telemetry & ACT Lab Semantic Search",
    domain: "Clinical Web & IoT Systems",
    videoSlug: "htic-systems",
    motionMode: "depth",
    summary:
      "Real-time surgical transit dashboard tracking organ pH, temperature, humidity, and GPS from Arduino sensors to Firebase, alongside a Next.js vector-embedding publication search portal for ACT Lab.",
    tags: ["Next.js", "Vector Embeddings", "Arduino / IoT", "Firebase"],
    links: [{ label: "Source", url: "https://github.com/Saransh482003" }],
  },
];

export const EXPERIENCE = [
  {
    period: "2026 – Present",
    role: "AI Code & RLHF Evaluator (Independent Contractor)",
    org: "DataAnnotation",
    bullets: [
      "Evaluate frontier language model outputs across Python software engineering, data pipelines, and mathematical reasoning, authoring reference implementations and failure analyses.",
    ],
  },
  {
    period: "Jun 2025 – Feb 2026",
    role: "AI/ML & Full-Stack Intern",
    org: "Healthcare Technology Innovation Centre (HTIC), IITM Research Park",
    orgUrl:
      "https://www.iitm.ac.in/research/institute-research-centres/healthcare-technology-innovation-centre",
    bullets: [
      "Implemented RAPTOR and GraphRAG architectures using Neo4j and LLM summarization over medical research literature and clinical device documentation.",
      "Built the ACT Lab web platform with automated research publication scraping and vector semantic search, benchmarked deep learning models on imbalanced clinical imaging datasets, and contributed to Arduino-to-cloud telemetry for an organ transit monitoring device.",
    ],
  },
  {
    period: "Jan 2025 – Present",
    role: "Teaching Assistant & ML Viva Examiner",
    org: "Indian Institute of Technology Madras",
    bullets: [
      "Assisted instruction and automated evaluation workflows for the Tools in Data Science course covering applied LLM workflows, web scraping, and analytics.",
      "Mentored student project cohorts in Machine Learning Practice and conduct technical viva examinations for machine learning capstone submissions.",
    ],
  },
  {
    period: "Jan 2024 – Apr 2024",
    role: "Web Development Intern",
    org: "NEXT IAS",
    bullets: [
      "Redesigned and built responsive course and event registration pages across desktop and mobile devices, lifting event registration completions by 15%.",
    ],
  },
];

export const EDUCATION = [
  {
    period: "Starting Jan 2027",
    institution: "Nanyang Technological University, Singapore",
    degree: "Master of Science in Artificial Intelligence",
  },
  {
    period: "Jan 2022 – May 2026",
    institution: "Indian Institute of Technology Madras",
    degree: "Bachelor of Science (B.S.) in Data Science and Applications",
  },
  {
    period: "Dec 2021 – Dec 2024",
    institution: "Delhi Skill and Entrepreneurship University",
    degree: "Bachelor of Science (B.Sc.) in Data Analytics",
  },
];
