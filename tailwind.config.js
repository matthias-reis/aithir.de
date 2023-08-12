/** @type {import('tailwindcss').Config} */

const mapHue = (saturation) => {
  return {
    100: `hsl(var(--hue), ${saturation}%, 0%)`,
    200: `hsl(var(--hue), ${saturation}%, 6%)`,
    300: `hsl(var(--hue), ${saturation}%, 18%)`,
    400: `hsl(var(--hue), ${saturation}%, 35%)`,
    500: `hsl(var(--hue), ${saturation}%, 50%)`,
    600: `hsl(var(--hue), ${saturation}%, 65%)`,
    700: `hsl(var(--hue), ${saturation}%, 82%)`,
    800: `hsl(var(--hue), ${saturation}%, 94%)`,
    900: `hsl(var(--hue), ${saturation}%, 100%)`,
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
      decent: mapHue(20),
      saturated: mapHue(65),
      main: 'hsl(var(--hue), 75%, 50%)',
      complement: 'hsl(var(--hue-complement), 75%, 50%)',
    },
    extend: {
      backgroundImage: {
        darkened:
          'linear-gradient(180deg, #0000 0%, #000b 40%, #000b 60%, #0000 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
