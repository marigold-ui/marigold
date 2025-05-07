import { SiteHeader } from '../_components/SiteHeader';

// Layout
// ---------------
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <SiteHeader />
    {children}
  </>
);

export default Layout;
