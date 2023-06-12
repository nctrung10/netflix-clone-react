/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spinner-grow': 'spinner-grow 300ms cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        'spinner-grow': {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { opacity: 0, transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

