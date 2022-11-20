import type { AppProps } from 'next/app';
import { TrackingProvider } from '../components/tracking-provider';
import PiwikProProvider from '@piwikpro/next-piwik-pro';
import { Analytics } from '@vercel/analytics/react';

const Piwik = (PiwikProProvider as any).default;

function OctahedronApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TrackingProvider />
      <Piwik
        accountName="octahedron.world"
        containerUrl="https://octahedron.containers.piwik.pro"
        containerId="70d2fc5f-9f84-43da-a30d-960d909bbbde"
      >
        <Component {...pageProps} />
      </Piwik>
      <Analytics />
    </>
  );
}

export default OctahedronApp;
