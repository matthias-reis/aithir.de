import type { AppProps } from 'next/app';
export { reportWebVitals } from 'next-axiom';
import PiwikPro from '@piwikpro/react-piwik-pro';

function MyApp({ Component, pageProps }: AppProps) {
  PiwikPro.initialize(
    '70d2fc5f-9f84-43da-a30d-960d909bbbde',
    'https://octahedron.containers.piwik.pro'
  );

  return <Component {...pageProps} />;
}

export default MyApp;
