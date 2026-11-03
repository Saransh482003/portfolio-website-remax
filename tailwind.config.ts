import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#FAF8F3",
          100: "#F4F0E6",
          200: "#EBE5D7",
          300: "#DDD5C3",
          400: "#C5B9A3",
        },
        ink: {
          900: "#1B1917",
          700: "#3F3B36",
          500: "#6E675F",
          400: "#8C847A",
        },
        umber: {
          700: "#6E421E",
          600: "#845026",
          500: "#9A6132",
          100: "#EFE6DA",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
