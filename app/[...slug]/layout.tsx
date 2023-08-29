import { usePathname, useRouter } from 'next/navigation';
import { headers } from 'next/headers';
import { LayoutFrame } from '../../comp/layout-frame';
import { getItem } from '../../core/data-layer';
import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const requestHeaders = headers();
  const slug = requestHeaders.get('x-path');
  const colorSpace = getItem(slug || '')?.colorSpace ?? 'neutral';

  return (
    <LayoutFrame className={colorSpace} withTextLogo>
      {children}
    </LayoutFrame>
  );
};

export default Layout;
