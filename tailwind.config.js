/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      disable: '#EAEAEA',
    }),
    extend: {},
  },
  plugins: [],
}
