import { FC, useEffect } from 'react';
import { initTracking } from '../core/tracking';

export const TrackingProvider: FC = () => {
  useEffect(() => {
    initTracking();
  }, []);
  return null;
};
