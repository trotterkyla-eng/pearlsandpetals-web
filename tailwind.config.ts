import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pearl: {
          50: "#FFF7FA",
          100: "#FBEAF1",
          200: "#F4DDE6",
          300: "#EEC8D6",
        },
        rose: {
          100: "#F6D5DD",
          200: "#E9B3C1",
          500: "#B35B72",
        },
        champagne: {
          200: "#F3E5C9",
          400: "#D6B77E",
          600: "#B48E4E",
        },
        ink: "#2A2528",
      },
      fontFamily: {
        serif: ["ui-serif", "Georgia", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px rgba(42,37,40,0.10)",
        card: "0 8px 24px rgba(42,37,40,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        paper:
          "radial-gradient(1200px 600px at 50% -10%, rgba(244,221,230,0.85), rgba(255,247,250,0.35) 60%, rgba(255,255,255,0) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
