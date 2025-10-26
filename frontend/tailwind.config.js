/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Mobile-first breakpoints (default Tailwind is already mobile-first)
      // Custom extensions for Reading Experience
      fontFamily: {
        'serif': ['Lora', 'Georgia', 'serif'], // For reader - Kindle-like
        'sans': ['Inter', 'system-ui', 'sans-serif'], // For UI
      },
      fontSize: {
        // Reading-optimized sizes
        'reader-sm': '16px',
        'reader-base': '18px',
        'reader-lg': '20px',
        'reader-xl': '22px',
      },
      lineHeight: {
        'reader': '1.75', // Optimal for reading
      },
      maxWidth: {
        'reader': '65ch', // Optimal line length for reading (50-75 chars)
      },
      colors: {
        // Theme colors (we'll expand this later)
        'reader-bg': '#FDFAF6', // Warm white for reading
        'reader-text': '#2A2A2A', // Soft black
        'reader-bg-dark': '#1A1A1A', // AMOLED black
        'reader-text-dark': '#E5E5E5', // Soft white
      }
    },
  },
  plugins: [],
  // Dark mode via class (we'll toggle this via UI later)
  darkMode: 'class',
}
