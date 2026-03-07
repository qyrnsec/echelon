import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        bg: "#0a0a0f",
        "bg-card": "#111118",
        "bg-hover": "#1a1a24",
        border: "#1e1e2e",
        accent: "#7c3aed",
        "accent-dim": "#6366f1",
        cyan: "#06b6d4",
        text: "#e2e2e8",
        "text-dim": "#6b6b80",
        red: "#ff4d6a",
        orange: "#ff9f43",
        purple: "#a78bfa",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#0a0a0f",
            foreground: "#e2e2e8",
            primary: {
              50: "#f5f3ff",
              100: "#ede9fe",
              200: "#ddd6fe",
              300: "#c4b5fd",
              400: "#a78bfa",
              500: "#8b5cf6",
              600: "#7c3aed",
              700: "#6d28d9",
              800: "#5b21b6",
              900: "#4c1d95",
              DEFAULT: "#7c3aed",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#6366f1",
              foreground: "#ffffff",
            },
            content1: "#111118",
            content2: "#1a1a24",
            default: {
              DEFAULT: "#1e1e2e",
              foreground: "#e2e2e8",
            },
          },
        },
      },
    }),
  ],
};

export default config;
