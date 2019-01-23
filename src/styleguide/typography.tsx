import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: ['Voltaire', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Dosis', 'Georgia', 'serif'],
  googleFonts: [
    {
      name: 'Dosis',
      styles: ['400', '400i', '700'],
    },
    {
      name: 'Voltaire',
      styles: ['400'],
    },
  ],
});

export default typography;
