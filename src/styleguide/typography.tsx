import Typography from 'typography';
import { colorCopy, lineHeight } from './var';

const typography = new Typography({
  baseFontSize: '18px',
  scaleRatio: 3,
  baseLineHeight: lineHeight,
  headerFontFamily: ['Voltaire', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
  bodyWeight: 200,
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['200', '200i', '700'],
    },
    {
      name: 'Voltaire',
      styles: ['400'],
    },
  ],
});

export default typography;
