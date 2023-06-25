import { usePiwikPro } from '@piwikpro/next-piwik-pro';

export const usePageView = () => {
  const { PageViews } = usePiwikPro();
  // return (title: string) => PageViews.trackPageView(title);
  return (title: string) => {};
};
