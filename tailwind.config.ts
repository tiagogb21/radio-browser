import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        project: {
          blue: {
            icon: "#196BE1",
            icon1: "#1267FC",
          },
          gray: {
            cotainer: "#2B2B30",
            title: "#4C4C56",
            card: "#62626D",
            options: "#4B4B55",
            drawer: "#18181B",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
