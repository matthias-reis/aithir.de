import type { AppProps } from 'next/app';
import { TrackingProvider } from '../components/tracking-provider';

function OctahedronApp({ Component, pageProps }: AppProps) {
  return (
    <TrackingProvider>
      <Component {...pageProps} />
    </TrackingProvider>
  );
}

export default OctahedronApp;
