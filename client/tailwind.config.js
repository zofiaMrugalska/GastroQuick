/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        JosefinSans: ["Josefin Sans", "sans-serif"],
      },
      boxShadow: {
        shadowInset: "inset 0px 0px 11px -2px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
