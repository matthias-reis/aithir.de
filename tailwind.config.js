/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        matze: {
          DEFAULT: "#1EA19A",
        },
      },
      fontFamily: {
        sans: ["Saira", "sans-serif"],
      },
      fontWeight: {
        light: 200,
        regular: 400,
        medium: 600,
        bold: 700,
      },
      fontSize: {
        sm: "0.9rem",
        base: "1.25rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
  },
  plugins: [],
};
