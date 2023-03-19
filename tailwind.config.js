/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".15em",
        wider: ".2em",
        widest: ".3em",
      },
      colors: {
        premium: "#7C6F55",
        outline: "#D1A64F"
      },
      backgroundImage: {
        'login': "url('https://res.cloudinary.com/dxnisjppy/image/upload/v1678359059/wpkwoqgc6ctjqkjeltju.jpg",
      },
    },
  },
  plugins: [],
};
