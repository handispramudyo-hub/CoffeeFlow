/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bux: {
          50: "#F2F0EB", // Krem putih (Background)
          100: "#D4E9E2", // Hijau muda (Hover)
          500: "#00704A", // Hijau Starbucks Primer (Tombol/Active)
          700: "#1E3932", // Hijau Tua Starbucks (Sidebar)
          800: "#006241", // Hijau Logo (Accent)
          900: "#000000", // Hitam (Teks heading)
        },
      },
    },
  },
  plugins: [],
};
