/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      minHeight: {
        'screen-minus-80': 'calc(100dvh - 20px)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define Inter como a fonte principal sans
      },
    },
  },
  plugins: [],
}

