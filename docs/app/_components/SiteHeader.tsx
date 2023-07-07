import { MobileNavigation } from './MobileNavigation';
import { SiteNavigation } from './SiteNavigation';

export const SiteHeader = () => (
  <header className="sticky top-0 z-10 w-full bg-white">
    <div className="container h-14">
      <MobileNavigation />
      <SiteNavigation />
    </div>
  </header>
);
