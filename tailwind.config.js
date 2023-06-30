/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        maxWidth: "200px",
      },
      colors: {
        main: "#fd8421",
        black: "#4D4D4D",
      },
    },
  },
  plugins: [],
};
