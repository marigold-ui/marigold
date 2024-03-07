import { MobileNavigation } from './MobileNavigation';
import { SiteNavigation } from './SiteNavigation';

export const SiteHeader = () => (
  <header className="border-secondary-200 bg-bg-body sticky top-0 z-10 w-full border-b">
    <div className="flex h-14 items-center px-3 xl:px-6">
      <MobileNavigation />
      <SiteNavigation />
    </div>
  </header>
);
