'use client';
import { Button, Link, cn } from '@/ui';
import type { Node } from 'fumadocs-core/page-tree';
import type * as PageTree from 'fumadocs-core/page-tree';
import { useSearchContext } from 'fumadocs-ui/provider';
import { ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import { NavLink } from '@/ui/navigation/NavLink';
import { useHasMounted } from '@/ui/useHasMounted';
import { MobileNavigation } from './_components/MobileNavigation';
import { SiteLogo } from './_components/SiteLogo';

interface HotKeyProps {
  letter: string;
  className?: string;
}
export const Hotkey = ({ letter, className }: HotKeyProps) => {
  const mounted = useHasMounted();
  if (!mounted) {
    return null;
  }
  const isMacOS = window.navigator.userAgent.includes('Mac OS');
  return (
    <span className={cn('opacity-50', className)} aria-hidden="true">
      ({isMacOS ? '⌘' : 'Ctrl+'}
      {letter})
    </span>
  );
};

function SearchToggle(props: ComponentProps<'button'>) {
  const { enabled, setOpenSearch } = useSearchContext();
  if (!enabled) return;

  return (
    <Button variant="sunken" size="small" onPress={() => setOpenSearch(true)}>
      Search...
      <Hotkey letter="K" />
    </Button>
  );
}

interface NavPage {
  name: string;
  $id?: string;
}

interface NavProps {
  pages: Node[];
  tree: PageTree.Root;
  badgeMap?: Record<string, string>;
}

export const Nav = ({ pages, tree, badgeMap = {} }: NavProps) => {
  const pathname = usePathname();

  // Filter and map nodes to NavPage format
  const navPages: NavPage[] = pages
    .filter(
      (node): node is Extract<Node, { type: 'page' | 'folder' }> =>
        'name' in node && typeof node.name === 'string'
    )
    .map(node => ({
      name: node.name as string,
      $id: node.$id,
    }));

  return (
    <header className="border-secondary-200 bg-bg-body sticky top-0 z-10 flex h-(--page-header-height) w-full items-center gap-2 border-b px-(--page-padding) md:px-(--page-padding-md) xl:px-(--page-padding-xl)">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavigation tree={tree} badgeMap={badgeMap} />
      </div>

      {/* Nav */}
      <div className="hidden gap-6 md:flex md:flex-1">
        <SiteLogo />
        <div className="flex items-center gap-4">
          {navPages.map(({ name, $id }) => {
            const slug = $id ? $id.split(':')[1] : '/';
            return (
              <NavLink
                variant="main"
                className="text-sm font-medium lg:px-1"
                key={$id}
                current={pathname.startsWith(`/${slug}`)}
                href={`/${slug}`}
              >
                {name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {/* Nav */}

      {/* <SiteMenu /> */}
      <div className="hidden lg:block">
        <Link href="https://marigold-rapp.vercel.app/" variant="cta">
          <span className="hidden 2xl:inline">Discover new </span>Tutorials!
        </Link>
      </div>
      <div className="flex flex-1 flex-col items-stretch md:block md:flex-initial">
        <SearchToggle />
      </div>
    </header>
  );
};
