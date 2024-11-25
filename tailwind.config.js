/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,js,tsx,jsx}", ],
  theme: {
    extend: {
      fontFamily: {
        'chocolate': ['"Chocolate Classical Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

