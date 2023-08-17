import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        flat: ["var(--flatbread)"],
      },
      colors: {
        red: "#9b2226",
        dark: "#0c0a09",
        white: "#e7e5e4",
        inactive: "#a1a1aa",
      },
    },
  },
  plugins: [],
};
export default config;
