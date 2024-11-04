/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'
export default {
  content: ['./index.html', "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans]
      },
      boxShadow: {
        'bottom': '0 4px 10px rgba(0, 0, 0, 0.2)',
      },
      height: {
        'screen-minus-90': 'calc(100dvh - 93px)',
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate")],
}

