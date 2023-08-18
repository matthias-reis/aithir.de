import { usePathname, useRouter } from 'next/navigation';
import { headers } from 'next/headers';
import { LayoutFrame } from '../../comp/layout-frame';
import { getItem } from '../../core/data-layer';
import { DynamicPageProps, FCC } from '../../core/types';

const Layout: FCC = ({ children }) => {
  const requestHeaders = headers();
  const slug = requestHeaders.get('x-path');
  const colorSpace = getItem(slug || '')?.colorSpace ?? 'neutral';

  console.log(colorSpace, getItem(slug || '')?.colorSpace, slug);

  return (
    <LayoutFrame className={colorSpace} withTextLogo>
      {children}
    </LayoutFrame>
  );
};

export default Layout;
