import { usePathname, useRouter } from 'next/navigation';
import { headers } from 'next/headers';
import { LayoutFrame } from '../../comp/layout-frame';
import { getItem } from '../../core/data-layer';
import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const requestHeaders = headers();
  const slug = requestHeaders.get('x-path');

  return children;
};

export default Layout;
