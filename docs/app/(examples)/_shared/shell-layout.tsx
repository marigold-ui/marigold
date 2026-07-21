'use client';

import { ArrowLeft, LifeBuoy } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppShell,
  Badge,
  Breadcrumbs,
  Inline,
  LinkButton,
  RouterProvider,
  Sidebar,
  Stack,
  Text,
  TopNavigation,
} from '@marigold/components';
import { Logo } from '@/ui/Logo';
import type { NavNode, NavSection, ShellConfig } from './shell-types';
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

// Match the slug against nav leaves, falling back to progressively shorter path
// prefixes. A drill-in like `users/token` has no leaf of its own, so it resolves
// to the parent `users` leaf and returns the leftover segments as `trailing` —
// the parent stays highlighted and the trailing segments become extra crumbs.
const findActive = (sections: NavSection[], slug: string) => {
  const segments = slug.split('/');
  for (let end = segments.length; end >= 1; end--) {
    const candidate = segments.slice(0, end).join('/');
    for (const section of sections) {
      const found = findLeaf(section.items, leaf => leaf.slug === candidate);
      if (found) {
        return { section, ...found, trailing: segments.slice(end) };
      }
    }
  }
  return {
    section: sections[0],
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
  const { leaf, ancestors, trailing } = findActive(config.sections, slug);
  const leafHref = leaf?.slug ? `${config.base}/${leaf.slug}` : config.base;

  return (
    <RouterProvider navigate={href => router.push(href)}>
      <Sidebar.Provider defaultOpen>
        <AppShell>
          <Sidebar>
            <Sidebar.Header>
              <Inline space="related" alignY="center" noWrap>
                <Logo className="size-8 shrink-0" />
                <Text weight="bold" fontSize="lg">
                  Examples
                </Text>
              </Inline>
            </Sidebar.Header>
            <Sidebar.Nav current={pathname}>
              {config.sections.map(section => [
                <Sidebar.GroupLabel key={`label-${section.label}`}>
                  {section.label}
                </Sidebar.GroupLabel>,
                ...renderNav(section.items, config.base),
              ])}
            </Sidebar.Nav>
            <Sidebar.Footer>
              <Stack space="related" alignX="left">
                <LinkButton
                  href={leaf?.docsHref ?? '/'}
                  variant="ghost"
                  size="small"
                >
                  <ArrowLeft />
                  {`Go to ${leaf?.docsLabel ?? 'documentation'}`}
                </LinkButton>
                <LinkButton
                  href="/getting-started/get-in-touch"
                  variant="ghost"
                  size="small"
                >
                  <LifeBuoy />
                  Get in touch
                </LinkButton>
              </Stack>
            </Sidebar.Footer>
          </Sidebar>
          <TopNavigation>
            <TopNavigation.Start>
              <Sidebar.Toggle />
            </TopNavigation.Start>
            <TopNavigation.Middle>
              <Breadcrumbs>
                {ancestors
                  // The trail names places, not structure: a self-contained
                  // app's root branch (its first leaf is the index, slug '')
                  // is already named by the sidebar header, so it drops out —
                  // every remaining ancestor links to its first real page.
                  .filter(ancestor => ancestor.slug)
                  .map(ancestor => (
                    <Breadcrumbs.Item
                      key={ancestor.label}
                      href={`${config.base}/${ancestor.slug}`}
                    >
                      {ancestor.label}
                    </Breadcrumbs.Item>
                  ))}
                {leaf && (
                  // On a drill-in the leaf becomes a real link back to the list.
                  <Breadcrumbs.Item href={leafHref}>
                    {leaf.label}
                  </Breadcrumbs.Item>
                )}
                {trailing.map((segment, index) => (
                  <Breadcrumbs.Item
                    key={segment}
                    // The last trailing segment is the page we are on.
                    href={index === trailing.length - 1 ? pathname : '#'}
                  >
                    {config.resolveLabel?.(segment) ?? segment}
                  </Breadcrumbs.Item>
                ))}
              </Breadcrumbs>
            </TopNavigation.Middle>
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
