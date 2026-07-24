'use client';

import { BookOpen, LifeBuoy } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppShell,
  Badge,
  Breadcrumbs,
  Inline,
  RouterProvider,
  Sidebar,
  Stack,
  Text,
  TopNavigation,
} from '@marigold/components';
import { Logo } from '@/ui/Logo';
import type { NavNode, RailTile, ShellConfig } from './shell-types';
import { UserMenu } from './user-menu';

type LeafItem = Extract<NavNode, { kind: 'Item'; slug: string }>;
type Ancestor = { label: string; slug?: string };

// First reachable leaf of a branch — the target an ancestor crumb links to,
// so every crumb in the trail is a real place (no dead `#` links).
const firstLeafSlug = (item: NavNode): string | undefined => {
  if (item.kind !== 'Item') return undefined;
  if (!item.children) return item.slug;
  for (const child of item.children) {
    const slug = firstLeafSlug(child);
    if (slug !== undefined) return slug;
  }
  return undefined;
};

const findLeaf = (
  items: NavNode[],
  predicate: (leaf: LeafItem) => boolean,
  ancestors: Ancestor[] = []
): { leaf: LeafItem; ancestors: Ancestor[] } | null => {
  for (const item of items) {
    if (item.kind !== 'Item') continue;
    if (item.children) {
      const found = findLeaf(item.children, predicate, [
        ...ancestors,
        { label: item.label, slug: firstLeafSlug(item) },
      ]);
      if (found) return found;
    } else if (predicate(item)) {
      return { leaf: item, ancestors };
    }
  }
  return null;
};

// The tile's landing page: a link tile is its own destination; a section tile
// lands on its first leaf (mirroring how `Sidebar.RailItem` resolves its href).
const tileLanding = (tile: RailTile, base: string): string => {
  if (tile.kind === 'link') return `${base}/${tile.slug}`;
  for (const item of tile.items) {
    const slug = firstLeafSlug(item);
    if (slug !== undefined) return slug ? `${base}/${slug}` : base;
  }
  return base;
};

// Match the slug against the tiles' destinations, falling back to progressively
// shorter path prefixes. A drill-in like `users/token` has no leaf of its own,
// so it resolves to the parent `users` leaf and returns the leftover segments as
// `trailing` — the parent stays highlighted and the trailing segments become
// extra crumbs.
const findActive = (tiles: RailTile[], slug: string) => {
  const segments = slug.split('/');
  for (let end = segments.length; end >= 1; end--) {
    const candidate = segments.slice(0, end).join('/');
    for (const tile of tiles) {
      if (tile.kind === 'link') {
        if (tile.slug === candidate) {
          return {
            tile,
            leaf: undefined,
            ancestors: [] as Ancestor[],
            trailing: segments.slice(end),
          };
        }
        continue;
      }
      const found = findLeaf(tile.items, leaf => leaf.slug === candidate);
      if (found) {
        return { tile, ...found, trailing: segments.slice(end) };
      }
    }
  }
  return {
    tile: tiles[0],
    leaf: undefined,
    ancestors: [] as Ancestor[],
    trailing: [] as string[],
  };
};

const renderNav = (items: NavNode[], base: string): ReactNode[] =>
  items.map((item, i) => {
    if (item.kind === 'Separator') {
      // Separators have no identity — index key is fine.
      // eslint-disable-next-line @eslint-react/no-array-index-key
      return <Sidebar.Separator key={`sep-${i}`} />;
    }
    if (item.kind === 'GroupLabel') {
      return (
        <Sidebar.GroupLabel key={`label-${item.label}`}>
          {item.label}
        </Sidebar.GroupLabel>
      );
    }
    if (item.children) {
      return (
        <Sidebar.Item key={`branch-${item.label}`} textValue={item.label}>
          {item.label}
          {renderNav(item.children, base)}
        </Sidebar.Item>
      );
    }
    const href = item.slug ? `${base}/${item.slug}` : base;
    return (
      <Sidebar.Item key={href} href={href}>
        {item.label}
      </Sidebar.Item>
    );
  });

const UserSection = () => (
  <Inline space="related" alignY="center" noWrap>
    <Stack>
      <Inline space="tight" alignY="center" noWrap>
        <Text size="sm" weight="bold">
          Jane Doe
        </Text>
        <Badge variant="master">Master</Badge>
      </Inline>
      <Text size="xs" variant="muted">
        Acme Inc.
      </Text>
    </Stack>
    <UserMenu />
  </Inline>
);

export const ShellLayout = ({
  config,
  children,
}: PropsWithChildren<{ config: ShellConfig }>) => {
  const pathname = usePathname();
  const router = useRouter();

  const slug = pathname.replace(config.base, '').replace(/^\//, '');
  const { tile, leaf, ancestors, trailing } = findActive(config.tiles, slug);
  const leafHref = leaf?.slug ? `${config.base}/${leaf.slug}` : config.base;
  // The contextual docs backlink: a link tile carries its own docs reference,
  // a section tile takes it from the active leaf.
  const docsHref =
    (tile.kind === 'link' ? tile.docsHref : leaf?.docsHref) ?? '/';

  return (
    <RouterProvider navigate={href => router.push(href)}>
      <Sidebar.Provider defaultOpen>
        <AppShell>
          <Sidebar>
            <Sidebar.Rail current={pathname}>
              {/* Brand for the mobile drawer — on desktop it lives in the top bar. */}
              <Sidebar.Header>
                <Inline space="related" alignY="center" noWrap>
                  <Logo className="size-8 shrink-0" />
                  <Text weight="bold" fontSize="lg">
                    Examples
                  </Text>
                </Inline>
              </Sidebar.Header>
              {config.tiles.map(item =>
                item.kind === 'link' ? (
                  <Sidebar.RailItem
                    key={item.id}
                    id={item.id}
                    icon={item.icon}
                    href={`${config.base}/${item.slug}`}
                  >
                    {item.label}
                  </Sidebar.RailItem>
                ) : (
                  <Sidebar.RailItem key={item.id} id={item.id} icon={item.icon}>
                    {item.label}
                    <Sidebar.Nav aria-label={item.label}>
                      {renderNav(item.items, config.base)}
                    </Sidebar.Nav>
                  </Sidebar.RailItem>
                )
              )}
              <Sidebar.Footer>
                {/* Pinned tiles: the docs backlink follows the active demo. */}
                <Sidebar.RailItem id="docs" icon={<BookOpen />} href={docsHref}>
                  Docs
                </Sidebar.RailItem>
                <Sidebar.RailItem
                  id="help"
                  icon={<LifeBuoy />}
                  href="/getting-started/get-in-touch"
                >
                  Help
                </Sidebar.RailItem>
              </Sidebar.Footer>
            </Sidebar.Rail>
          </Sidebar>
          <TopNavigation>
            <TopNavigation.Start>
              {/* The bar spans the full width; the brand holds the fixed
                  top-left spot and never moves when the panel collapses. */}
              <Inline space="related" alignY="center" noWrap>
                <Logo className="size-8 shrink-0" />
                <Text weight="bold" fontSize="lg">
                  Examples
                </Text>
              </Inline>
              <Sidebar.Toggle variant="rail" />
              <Breadcrumbs>
                {/* The active tile leads the trail so the location stays
                    readable when the rail is collapsed to icons. On the
                    landing page it can share its href with the leaf crumb,
                    so crumbs are keyed by role, not href. */}
                <Breadcrumbs.Item
                  key={`tile-${tile.id}`}
                  href={tileLanding(tile, config.base)}
                >
                  {tile.label}
                </Breadcrumbs.Item>
                {ancestors
                  // Every ancestor crumb links to its first real page; a
                  // branch without one has nowhere to go and drops out.
                  .filter(ancestor => ancestor.slug)
                  .map(ancestor => (
                    <Breadcrumbs.Item
                      key={`ancestor-${ancestor.label}`}
                      href={`${config.base}/${ancestor.slug}`}
                    >
                      {ancestor.label}
                    </Breadcrumbs.Item>
                  ))}
                {leaf && (
                  // On a drill-in the leaf becomes a real link back to the list.
                  <Breadcrumbs.Item key="leaf" href={leafHref}>
                    {leaf.label}
                  </Breadcrumbs.Item>
                )}
                {trailing.map((segment, index) => (
                  <Breadcrumbs.Item
                    key={`trailing-${segment}`}
                    // The last trailing segment is the page we are on.
                    href={index === trailing.length - 1 ? pathname : '#'}
                  >
                    {config.resolveLabel?.(segment) ?? segment}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
            </TopNavigation.Start>
            <TopNavigation.End>
              <UserSection />
            </TopNavigation.End>
          </TopNavigation>
          {children}
        </AppShell>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
