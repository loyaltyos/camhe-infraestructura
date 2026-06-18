import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        camhe: {
          yellow: "#f3c316",
          black: "#0b0b0c",
          graphite: "#1f2328",
          steel: "#5f6872"
        }
      },
      boxShadow: {
        industrial: "0 18px 60px rgba(0, 0, 0, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
