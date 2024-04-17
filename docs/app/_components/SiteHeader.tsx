import { MobileNavigation } from './MobileNavigation';
import { SiteLogo } from './SiteLogo';
import { SiteMenu } from './SiteMenu';
import { SiteNavigation } from './SiteNavigation';
import { ThemeMenu } from './ThemeMenu';

export const SiteHeader = () => (
  <header className="border-secondary-200 bg-bg-body sticky top-0 z-10 w-full border-b">
    <div className="flex h-14 items-center gap-2 px-3 xl:px-6">
      <div className="md:hidden">
        <MobileNavigation />
      </div>
      <div className="hidden gap-6 md:flex md:flex-1">
        <SiteLogo />
        <SiteNavigation />
      </div>
      <div className="flex flex-1 flex-col items-stretch md:block md:flex-initial">
        <SiteMenu />
      </div>
      <ThemeMenu />
    </div>
  </header>
);
