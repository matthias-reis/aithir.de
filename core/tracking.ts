import mixpanel from 'mixpanel-browser';
import { getCookie } from './cookie';

export const initTracking = () => {
  mixpanel.init('cca8e2ee5ac2cad68e9ea740f83ea151', { debug: true });
  mixpanel.track('Session');
  const isAdmin = getCookie('oa') === 'oa';
  if (isAdmin) {
    mixpanel.register({ role: 'admin' });
  }
};

export const pageView = (
  type: string,
  title: string,
  storyline?: string | null,
  campaign?: string
) => {
  if (campaign) {
    mixpanel.register({ campaign });
  }
  mixpanel.track(`Page ${type}`, { type, title, storyline });
};
