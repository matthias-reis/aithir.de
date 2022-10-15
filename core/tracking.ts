import mixpanel from 'mixpanel-browser';

export const initTracking = () => {
  mixpanel.init('cca8e2ee5ac2cad68e9ea740f83ea151', { debug: true });
  mixpanel.track('Session');
};

export const pageView = (type: string, title: string, campaign?: string) => {
  mixpanel.track(`Page ${type}`, { type, title, campaign });
};
