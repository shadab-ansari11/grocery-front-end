/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10b981",
          dark: "#059669",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          dark: "#7c3aed",
        },
        background: {
          light: "#f0fdf4",
          white: "#ffffff",
          card: "#ffffff",
          "card-hover": "#f9f9f9",
        },
        text: {
          primary: "#064e3b",
          secondary: "#6b7280",
        },
        border: "#d1fae5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
