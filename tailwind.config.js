/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'story-pink': '#D4537E',
        'story-pink-dark': '#72243E',
        'lantern-amber': '#EF9F27',
        'night-sky-blue': '#378ADD',
        'meadow-green': '#639922',
        'parchment-cream': '#FAEEDA',
        ink: '#2C2C2A',
        gray: '#5F5E5A',
        'light-gray': '#D3D1C7',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
