/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        bg: {
          Def: '#f8f9ff',
          card: '#f1f3fa',
        },
      },
    },
  },
  plugins: [],
};
