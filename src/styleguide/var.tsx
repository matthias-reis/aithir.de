export const colorBackground = '#2e3332';
export const colorCopy = '#ccc';
export const colorCopyWeak = '#999';
export const colorStrong = '#fff';
export const colorHighlight = '#30A795';
export const colorHighlightBright = '#77C3B8';
export const colorSecondary = '#A1192E';

export const lineHeight = 1.6;

export const col = 172;
export const gutter = 20;
export const col6 = 6 * col + gutter;
export const col4 = 4 * col + gutter;
export const col3 = 3 * col + gutter;

export const breakpoint40 = '1440px';
export const breakpoint30 = `${col6}px`; // 6 col + gutter
export const breakpoint20 = `${col4}px`; // 4col + gutter
export const breakpoint10 = `${col3}px`; // 3col + gutter

export const media10 = `(min-width: ${breakpoint10})`;
export const media20 = `(min-width: ${breakpoint20})`;
export const media30 = `(min-width: ${breakpoint30})`;
export const media40 = `(min-width: ${breakpoint40})`;

export const headlineFontStack = [
  'Voltaire',
  'Helvetica',
  'Arial',
  'sans-serif',
];
export const headlineFont = headlineFontStack.join(', ');

export const bodyFontStack = ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'];
export const bodyFont = bodyFontStack.join(', ');
