/** @type {import('tailwindcss').Config} */
import { twMerge } from 'tailwind-merge'

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [twMerge],
}

