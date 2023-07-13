import { MobileNavigation } from './MobileNavigation';
import { SiteNavigation } from './SiteNavigation';

export const SiteHeader = () => (
  <header className="border-secondary-300 sticky top-0 z-10 w-full border-b bg-white">
    <div className="container flex h-14 items-center">
      <MobileNavigation />
      <SiteNavigation />
    </div>
  </header>
);
