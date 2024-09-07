/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:{
        customBlue: '#007bff'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
