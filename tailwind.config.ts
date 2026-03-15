import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09080b",
        charcoal: "#111218",
        dune: "#caa86a",
        sand: "#e7d7bb",
        ivory: "#f7f1e6",
        ember: "#7a5a37",
        bronze: "#8d6a3e"
      },
      fontFamily: {
        display: ['"Iowan Old Style"', '"Palatino Linotype"', '"Book Antiqua"', "Palatino", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(202, 168, 106, 0.18)",
        panel: "0 20px 60px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "radial-lux": "radial-gradient(circle at top, rgba(202,168,106,0.15), transparent 40%)",
        "mesh-desert":
          "linear-gradient(120deg, rgba(202,168,106,0.16), transparent 40%), linear-gradient(220deg, rgba(122,90,55,0.16), transparent 35%)"
      },
      animation: {
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-gold": "pulseGold 3.2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(202, 168, 106, 0.28)" },
          "70%": { boxShadow: "0 0 0 14px rgba(202, 168, 106, 0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
