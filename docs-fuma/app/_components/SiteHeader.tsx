import { source } from '@/lib/source';
import { Link } from '@/ui';
import { MobileNavigation } from './MobileNavigation';
import { SiteLogo } from './SiteLogo';
import { SiteMenu } from './SiteMenu';
import { SiteNavigation } from './SiteNavigation';

export const SiteHeader = () => {
  const pages = source.pageTree.children.map(page => ({
    slug: page.$id?.split(':')[1],
    title: page.name,
  }));

  console.log('pageTree', source.pageTree);
  return (
    <header className="border-secondary-200 bg-bg-body sticky top-0 z-10 flex h-(--page-header-height) w-full items-center gap-2 border-b px-(--page-padding) md:px-(--page-padding-md) xl:px-(--page-padding-xl)">
      <div className="md:hidden">{/* <MobileNavigation /> */}</div>
      <div className="hidden gap-6 md:flex md:flex-1">
        <SiteLogo />
        <SiteNavigation pages={pages} />
      </div>
      <div className="hidden lg:block">
        <Link href="https://marigold-rapp.vercel.app/" variant="cta">
          <span className="hidden 2xl:inline">Discover new </span>Tutorials!
        </Link>
      </div>
      <div className="flex flex-1 flex-col items-stretch md:block md:flex-initial">
        search command
        {/* <SiteMenu /> */}
      </div>
    </header>
  );
};
