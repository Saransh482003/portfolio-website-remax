export const SITE_CONFIG = {
  name: "Saransh Saini",
  title: "Saransh Saini — AI Engineer | Custom RAG, Computer Vision & MLOps",
  shortRole: "AI Engineer",
  location: "Delhi, India",
  email: "saransh.saini.ai@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.saranshsaini.in",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/saransh-saini-ai/30min",
  links: {
    github: "https://github.com/Saransh482003",
    linkedin: "https://www.linkedin.com/in/saranshsaini48/",
    ragner: "https://ragner.vercel.app/",
    researchGate:
      "https://www.researchgate.net/publication/392194582_CureCue_A_Smart_Adherence_Assistant_and_Reminder_System",
  },
} as const;
