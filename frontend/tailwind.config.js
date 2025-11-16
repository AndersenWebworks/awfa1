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
        'serif': ['"Goudy Bookletter 1911"', 'Georgia', 'serif'], // For story text - vintage book feel
        'sans': ['Inter', 'system-ui', 'sans-serif'], // For UI
      },
      fontSize: {
        // Reading-optimized sizes (based on read.gov standards)
        'reader-sm': '16px',
        'reader-base': '24px', // read.gov standard for paragraph text
        'reader-lg': '28px',   // read.gov h2
        'reader-xl': '36px',   // read.gov h1
      },
      lineHeight: {
        'reader': '1.0', // read.gov uses 24pt line-height for 24px text = 1.0
      },
      letterSpacing: {
        'reader': '2px', // read.gov letter-spacing for readability
      },
      maxWidth: {
        'reader': '65ch', // Optimal line length for reading (50-75 chars)
      },
      colors: {
        // Book-like color palette (literary design)
        'paper': '#FAF8F3',        // Warm cream (like book pages)
        'ink': '#666666',          // read.gov text color (softer on eyes)
        'ink-light': '#6B5D52',    // Lighter ink
        'sepia': '#8B7355',        // Aged ink
        'sepia-light': '#A67C52',  // Gold-brown accent
        'shadow': '#E8E3D8',       // Soft beige shadow
        'divider': '#D4C4B0',      // Light sepia divider

        // Dark mode (optional, for evening reading)
        'paper-dark': '#1E1915',
        'ink-dark': '#E8E3D8',
      },
      textIndent: {
        'paragraph': '50px',       // read.gov paragraph indent
      }
    },
  },
  plugins: [],
  // Dark mode via class (we'll toggle this via UI later)
  darkMode: 'class',
}
