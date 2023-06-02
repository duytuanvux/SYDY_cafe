/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-grey": "#3E3939",
        "base-cream": "#F6F4F4",
      },
    },
  },
  plugins: [],
};
