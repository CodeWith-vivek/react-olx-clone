/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js", // Flowbite React components
    "./node_modules/flowbite/**/*.js", // Flowbite core components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Flowbite plugin for Tailwind CSS core styles
  ],
};
