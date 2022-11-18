import type { AppProps } from 'next/app';
import { TrackingProvider } from '../components/tracking-provider';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TrackingProvider />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
