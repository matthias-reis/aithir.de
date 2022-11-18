import type { AppProps } from 'next/app';
import { TrackingProvider } from '../components/tracking-provider';
import PiwikProProvider from '@piwikpro/next-piwik-pro';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TrackingProvider />
      <PiwikProProvider
        accountName="octahedron.world"
        containerId="70d2fc5f-9f84-43da-a30d-960d909bbbde"
      >
        <Component {...pageProps} />
      </PiwikProProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
