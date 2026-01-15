'use client';

import { Button, Dialog } from '@/ui';
import { Badge } from '@/ui';
import type * as PageTree from 'fumadocs-core/page-tree';
import { TreeContextProvider, useTreeContext } from 'fumadocs-ui/contexts/tree';
import { type ReactNode, createContext, use, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { NavLink } from '@/ui/navigation/NavLink';
import { SiteLogo } from '../../app/_components/SiteLogo';

// Helpers
// ---------------
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// Context for badge data
const BadgeContext = createContext<Record<string, string>>({});

// Props
// ---------------
interface MobileNavigationProps {
  tree: PageTree.Root;
  badgeMap?: Record<string, string>;
}

// Component
// ---------------
export const MobileNavigation = ({
  tree,
  badgeMap = {},
}: MobileNavigationProps) => (
  <Dialog.Trigger>
    <Button variant="ghost">
      <MenuIcon />
    </Button>
    <Dialog variant="fullscreen" closeButton>
      {({ close }) => (
        <>
          <header className="flex items-center gap-2 pl-4 text-3xl font-bold tracking-tight text-[#46505a] uppercase">
            <SiteLogo />
            Marigold
          </header>
          <div className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full right-0 bottom-0 -mr-4 h-[calc(100vh-90px)] overflow-y-auto">
            <TreeContextProvider tree={tree}>
              <BadgeContext value={badgeMap}>
                <MobileSidebar onNavigate={close} />
              </BadgeContext>
            </TreeContextProvider>
          </div>
        </>
      )}
    </Dialog>
  </Dialog.Trigger>
);

function MobileSidebar({ onNavigate }: { onNavigate: () => void }) {
  const { root } = useTreeContext();
  const children = useMemo(() => {
    function renderItems(items: PageTree.Node[], depth: number = 0) {
      return items.map(item => (
        <MobileSidebarItem
          key={item.$id}
          item={item}
          onNavigate={onNavigate}
          depth={depth}
        >
          {item.type === 'folder'
            ? renderItems(item.children, depth + 1)
            : null}
        </MobileSidebarItem>
      ));
    }

    return renderItems(root.children, 0);
  }, [root, onNavigate]);

  return <nav className="mb-12 flex flex-col pt-8 pr-11 pl-4">{children}</nav>;
}

function MobileSidebarItem({
  item,
  children,
  onNavigate,
  depth = 0,
}: {
  item: PageTree.Node;
  children: ReactNode;
  onNavigate: () => void;
  depth?: number;
}) {
  const pathname = usePathname();
  const badgeMap = use(BadgeContext);

  if (item.type === 'page') {
    const badge = badgeMap[item.url];
    return (
      <NavLink
        className="flex items-center gap-4"
        href={item.url}
        current={pathname === item.url}
        onClick={onNavigate}
      >
        {item.icon}
        {item.name}
        {badge && <Badge variant="dark">{badge}</Badge>}
      </NavLink>
    );
  }

  if (item.type === 'separator') {
    return (
      <p className="text-secondary-600 pt-4 pb-2 text-sm font-semibold">
        {item.icon}
        {item.name}
      </p>
    );
  }

  const indexBadge = item.index ? badgeMap[item.index.url] : undefined;
  // Only add large bottom padding at depth 0 (top-level sections)
  const spacingClass = depth === 0 ? 'pb-4' : 'pb-2';

  return (
    <div className={`flex flex-col gap-2.5 ${spacingClass}`}>
      {item.index ? (
        <NavLink
          className="flex items-center gap-4"
          current={pathname === item.index.url}
          href={item.index.url}
          onClick={onNavigate}
        >
          {item.index.icon}
          {item.index.name}
          {indexBadge && <Badge variant="dark">{indexBadge}</Badge>}
        </NavLink>
      ) : (
        <p className="text-secondary-600 text-sm font-semibold">
          {item.icon}
          {item.name}
        </p>
      )}
      <div className="border-secondary-300 ml-0.5 flex flex-col border-l">
        {children}
      </div>
    </div>
  );
}
