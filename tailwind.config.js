/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths based on your project structure
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}