import { LayoutFrame } from '../../comp/layout-frame';
import { getItem } from '../../core/data-layer';
import { DynamicPageProps, FCC } from '../../core/types';

const Layout: FCC<DynamicPageProps> = ({ children, params }) => {
  const slug = params?.slug.join('/');
  const item = getItem(slug);

  const colorSpace = item?.colorSpace;

  return (
    <LayoutFrame className={colorSpace} withTextLogo>
      <div className="flex justify-center">
        <div className="w-3/4">{children}</div>
      </div>
    </LayoutFrame>
  );
};

export default Layout;
