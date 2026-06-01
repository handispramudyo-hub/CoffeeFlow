/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        coffee: {
          50: "#FDFBF9",
          100: "#F8F5F2",
          200: "#EDE5DC",
          300: "#D4C5B3",
          400: "#B89A7E",
          500: "#A67B5B",
          600: "#8B6548",
          700: "#6F4E37",
          800: "#5A3E2B",
          900: "#3E2A1C",
        },
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)",
        card: "0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -2px rgba(0,0,0,0.04)",
        modal: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
