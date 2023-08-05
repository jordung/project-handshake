/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#568D90",
          secondary: "#D9D9D9",
          accent: "#CCDDDE",
          neutral: "#353535",
          "base-100": "#f3f4f6",
          info: "#38bdf8",
          success: "#34d399",
          warning: "#fcd34d",
          error: "#f87171",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
