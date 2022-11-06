import { FC, useEffect } from 'react';
import { initTracking } from '../core/tracking';

initTracking();

export const TrackingProvider: FC = () => {
  useEffect(() => {}, []);
  return null;
};
