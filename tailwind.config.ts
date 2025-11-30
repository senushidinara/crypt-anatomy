import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Halloween Theme Colors
        blood: {
          DEFAULT: "hsl(var(--blood-red))",
          red: "hsl(var(--blood-red))",
        },
        toxic: {
          DEFAULT: "hsl(var(--toxic-green))",
          green: "hsl(var(--toxic-green))",
        },
        ghost: {
          DEFAULT: "hsl(var(--ghost-white))",
          white: "hsl(var(--ghost-white))",
        },
        coffin: {
          DEFAULT: "hsl(var(--coffin-black))",
          black: "hsl(var(--coffin-black))",
        },
        shadow: {
          DEFAULT: "hsl(var(--shadow-gray))",
          gray: "hsl(var(--shadow-gray))",
        },
      },
      fontFamily: {
        gothic: ['Cinzel', 'serif'],
        creepy: ['Creepster', 'cursive'],
        serif: ['EB Garamond', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41.99%": { opacity: "1" },
          "42%": { opacity: "0.8" },
          "43%": { opacity: "1" },
          "45.99%": { opacity: "1" },
          "46%": { opacity: "0.6" },
          "46.5%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px hsla(174 57% 43% / 0.5))" },
          "50%": { filter: "drop-shadow(0 0 20px hsla(174 57% 43% / 0.8))" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.05)" },
          "20%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.05)" },
          "40%": { transform: "scale(1)" },
        },
        ghostFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        flicker: "flicker 3s infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        "ghost-float": "ghostFloat 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
