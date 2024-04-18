import { MobileNavigation } from './MobileNavigation';
import { SiteLogo } from './SiteLogo';
import { SiteMenu } from './SiteMenu';
import { SiteNavigation } from './SiteNavigation';
import { ThemeMenu } from './ThemeMenu';

export const SiteHeader = () => (
  <header className="border-secondary-200 bg-bg-body sticky top-0 z-10 flex h-14 w-full items-center gap-2 border-b px-[--page-padding] xl:px-[--page-padding-xl]">
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
  </header>
);
