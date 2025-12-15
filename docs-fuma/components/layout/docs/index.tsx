'use client';
import { Nav } from '@/app/Nav';
import { SiteLogo } from '@/app/_components/SiteLogo';
import { SiteNavigation } from '@/app/_components/SiteNavigation';
import { Badge, Button, Link } from '@/ui';
import { cva } from 'class-variance-authority';
import { usePathname } from 'fumadocs-core/framework';
import type * as PageTree from 'fumadocs-core/page-tree';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { TreeContextProvider, useTreeContext } from 'fumadocs-ui/contexts/tree';
import {
  type ComponentProps,
  type ReactNode,
  createContext,
  use,
  useMemo,
  useState,
} from 'react';
import { cn } from '@marigold/system';
import { NavLink } from '@/ui/navigation/NavLink';
import { useHasMounted } from '@/ui/useHasMounted';

interface SidebarContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContext | null>(null);

// Context for badge data
const BadgeContext = createContext<Record<string, string>>({});

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
  badgeMap?: Record<string, string>;
}

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

export function DocsLayout({ tree, children, badgeMap = {} }: DocsLayoutProps) {
  const pathname = usePathname();
  return (
    <TreeContextProvider tree={tree}>
      <BadgeContext value={badgeMap}>
        <SidebarProvider>
          <Nav pages={tree.children} />
          <main
            id="nd-docs-layout"
            className="flex flex-1 flex-row [--fd-nav-height:56px]"
          >
            <Sidebar />
            {/* this is the content */}
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </BadgeContext>
    </TreeContextProvider>
  );
}

function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext
      value={useMemo(
        () => ({
          open,
          setOpen,
        }),
        [open]
      )}
    >
      {children}
    </SidebarContext>
  );
}

function NavbarSidebarTrigger(props: ComponentProps<'button'>) {
  const { open, setOpen } = use(SidebarContext)!;

  return (
    <button
      {...props}
      className={cn('text-sm', props.className)}
      onClick={() => setOpen(!open)}
    >
      Sidebar
    </button>
  );
}

function Sidebar() {
  const { root } = useTreeContext();
  const { open } = use(SidebarContext)!;
  console.log('root.children', root.children);
  console.log('root', root);
  const children = useMemo(() => {
    function renderItems(items: PageTree.Node[]) {
      return items.map(item => (
        <SidebarItem key={item.$id} item={item}>
          {item.type === 'folder' ? renderItems(item.children) : null}
        </SidebarItem>
      ));
    }

    return renderItems(root.children);
  }, [root]);

  return (
    <aside
      className={cn(
        'fixed top-14 z-20 flex shrink-0 flex-col py-10 pl-12 text-sm md:sticky md:h-[calc(100dvh-56px)] md:w-[300px]',
        'overflow-hidden hover:overflow-y-auto',
        '[&>a]:border-l-secondary-300',
        'max-md:bg-fd-background max-md:inset-x-0 max-md:bottom-0',
        'border-secondary-200 border-r',
        'scrollbar-thin scrollbar-thumb-secondary-400 scrollbar-thumb-rounded-full scrollbar-track-transparent',
        !open && 'max-md:invisible'
      )}
    >
      {children}
    </aside>
  );
}

const linkVariants = cva(
  'flex items-center gap-2 w-full py-1.5 rounded-lg text-fd-foreground/80 [&_svg]:size-4',
  {
    variants: {
      active: {
        true: 'text-fd-primary font-medium',
        false: 'hover:text-fd-accent-foreground',
      },
    },
  }
);

function SidebarItem({
  item,
  children,
}: {
  item: PageTree.Node;
  children: ReactNode;
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
      >
        {item.icon}
        {item.name}
        {badge && <Badge variant="dark">{badge}</Badge>}
      </NavLink>
    );
  }

  if (item.type === 'separator') {
    return (
      <p className="text-secondary-600 my-4 text-sm font-semibold">
        {item.icon}
        {item.name}
      </p>
    );
  }

  const indexBadge = item.index ? badgeMap[item.index.url] : undefined;

  return (
    <div>
      {item.index ? (
        <NavLink
          className="flex items-center gap-4"
          current={pathname === item.index.url}
          href={item.index.url}
        >
          {item.index.icon}
          {item.index.name}
          {indexBadge && <Badge variant="dark">{indexBadge}</Badge>}
        </NavLink>
      ) : (
        <p className="text-secondary-600 my-4 text-sm font-semibold">
          {item.icon}
          {item.name}
        </p>
      )}
      <div className="border-secondary-300 flex flex-col border-l">
        {children}
      </div>
    </div>
  );
}
