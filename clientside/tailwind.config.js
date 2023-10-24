/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1565D8",
        secondary: "#183B56",
        dark: "#011736",
        // lightPrimary: "#4f86d3",
      },
    },
    screens: {
      lg: { max: "1023px" },
      sm: { max: "909px" },
    },
  },
  plugins: [],
};

