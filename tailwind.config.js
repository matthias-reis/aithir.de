/** @type {import('tailwindcss').Config} */

const mapHue = (hue, isdimmed) => {
  const saturation = isdimmed ? 20 : 80;
  return {
    100: `hsl(${hue}deg, ${saturation}%, 0%)`,
    200: `hsl(${hue}deg, ${saturation}%, 6%)`,
    300: `hsl(${hue}deg, ${saturation}%, 18%)`,
    400: `hsl(${hue}deg, ${saturation}%, 35%)`,
    500: `hsl(${hue}deg, ${saturation}%, 50%)`,
    600: `hsl(${hue}deg, ${saturation}%, 65%)`,
    700: `hsl(${hue}deg, ${saturation}%, 82%)`,
    800: `hsl(${hue}deg, ${saturation}%, 94%)`,
    900: `hsl(${hue}deg, ${saturation}%, 100%)`,
    950: `hsl(${hue}deg, 100%, 50%)`,
  };
};

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
      neutral: mapHue(185, true),
      complementary: mapHue(5, false),
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
