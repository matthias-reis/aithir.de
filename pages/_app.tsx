import type { AppProps } from 'next/app';
import { TrackingProvider } from '../components/tracking-provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TrackingProvider />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
