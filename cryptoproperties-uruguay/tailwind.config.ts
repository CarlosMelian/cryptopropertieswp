import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#07080A",
          50: "#0A0B0E",
          100: "#0D0E12",
        },
        graphite: {
          DEFAULT: "#14151A",
          light: "#1C1E24",
          border: "#26282F",
        },
        gold: {
          deep: "#8A6D1F",
          DEFAULT: "#C9A53B",
          bright: "#E8C468",
          mist: "rgba(201,165,59,0.08)",
        },
        ink: {
          DEFAULT: "#F5F3EE",
          muted: "#A8A9B3",
          faint: "#6B6D78",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #C9A53B, transparent)",
        "gold-radial": "radial-gradient(circle at 50% 0%, rgba(201,165,59,0.16), transparent 60%)",
        "noise": "url('/noise.svg')",
      },
      boxShadow: {
        gold: "0 0 40px rgba(201,165,59,0.18)",
        "gold-sm": "0 0 18px rgba(201,165,59,0.14)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      animation: {
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "spin-slow": "spin 16s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
