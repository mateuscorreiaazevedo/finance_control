import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,scss}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config
