import { FC, useEffect } from 'react';
import { initTracking } from '../core/tracking';

initTracking();

export const TrackingProvider: FC = () => {
  useEffect(() => {
    console.log('tracking provider: mount');
  }, []);
  return null;
};
