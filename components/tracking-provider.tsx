import { FC, ReactNode, useEffect } from 'react';
import PiwikProProvider from '@piwikpro/next-piwik-pro';

export const TrackingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <PiwikProProvider
      containerUrl="https://octahedron.containers.piwik.pro"
      containerId="70d2fc5f-9f84-43da-a30d-960d909bbbde"
    >
      {children}
    </PiwikProProvider>
  );
};
