import type { AppProps } from 'next/app';
import { TrackingProvider } from '../components/tracking-provider';
export { reportWebVitals } from 'next-axiom';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TrackingProvider />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
