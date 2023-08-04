/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './comp/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)'],
      serif: ['var(--font-serif)'],
      script: ['var(--font-script)'],
    },
    spacing: {
      1: '0.1rem',
      2: '0.25rem',
      3: '0.5rem',
      4: '1rem',
      5: '2rem',
      6: '3rem',
      7: '5rem',
      8: '8rem',
      9: '13rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      neutral: {
        100: '#000',
        200: '#111827',
        300: '#1F2937',
        400: '#374151',
        500: '#4B5563',
        600: '#6B7280',
        700: '#9CA3AF',
        800: '#D1D5DB',
        900: '#F9FAFB',
      },
      primary: '#08b9c4',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
