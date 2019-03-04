import Typography from 'typography';
import { lineHeight, bodyFontStack, headlineFontStack } from './var';

const typography = new Typography({
  baseFontSize: '18px',
  scaleRatio: 3,
  baseLineHeight: lineHeight,
  headerFontFamily: headlineFontStack,
  bodyFontFamily: bodyFontStack,
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
