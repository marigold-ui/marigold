import { MobileNavigation } from './MobileNavigation';
import { SiteMenu } from './SiteMenu';
import { SiteNavigation } from './SiteNavigation';
import { ThemeMenu } from './ThemeMenu';

export const SiteHeader = () => (
  <header className="border-secondary-200 bg-bg-body sticky top-0 z-10 w-full border-b">
    <div className="flex h-14 items-center gap-2 px-3 xl:px-6">
      <MobileNavigation />
      <SiteMenu />
      <ThemeMenu />
    </div>
  </header>
);

{
  /* <header className="border-secondary-200 bg-bg-body sticky top-0 z-10 w-full border-b">
<div className="flex h-14 items-center px-3 xl:px-6">
  <MobileNavigation />
  <SiteNavigation />
</div>
</header> */
}
