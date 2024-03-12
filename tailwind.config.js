/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

