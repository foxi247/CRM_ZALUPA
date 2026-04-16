import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void:            "#000000",
        surface:         "#0e0e0e",
        "surface-low":   "#141414",
        "surface-mid":   "#1a1919",
        "surface-high":  "#1f1e1e",
        "surface-top":   "#262626",
        primary:         "#8ff5ff",
        "primary-dim":   "#3db8c8",
        "primary-cont":  "#00eefc",
        secondary:       "#ac89ff",
        "secondary-dim": "#7b5ec4",
        tertiary:        "#f3ffca",
        "on-surface":    "#e8e6e6",
        "on-variant":    "#adaaaa",
        ghost:           "#494847",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body:    ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.02em",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
