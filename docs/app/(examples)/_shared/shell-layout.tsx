'use client';

import { ArrowLeft, LifeBuoy } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppLayout,
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

const findLeaf = (
  items: NavNode[],
  predicate: (leaf: LeafItem) => boolean,
  ancestors: string[] = []
): { leaf: LeafItem; ancestors: string[] } | null => {
  for (const item of items) {
    if (item.kind !== 'Item') continue;
    if (item.children) {
      const found = findLeaf(item.children, predicate, [
        ...ancestors,
        item.label,
      ]);
      if (found) return found;
    } else if (predicate(item)) {
      return { leaf: item, ancestors };
    }
  }
  return null;
};

const findActive = (sections: NavSection[], slug: string) => {
  for (const section of sections) {
    const found = findLeaf(section.items, leaf => leaf.slug === slug);
    if (found) return { section, ...found };
  }
  return { section: sections[0], leaf: undefined, ancestors: [] as string[] };
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
  <Inline space={2} alignY="center" noWrap>
    <Stack>
      <Inline space={1} alignY="center" noWrap>
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
  const { leaf, ancestors } = findActive(config.sections, slug);

  return (
    <RouterProvider navigate={href => router.push(href)}>
      <Sidebar.Provider defaultOpen>
        <AppLayout>
          <AppLayout.Sidebar>
            <Sidebar.Header>
              <Inline space={2} alignY="center" noWrap>
                <Logo className="size-8 shrink-0" />
                <Text weight="bold" fontSize="lg">
                  Examples
                </Text>
              </Inline>
            </Sidebar.Header>
            <Sidebar.Nav current={pathname}>
              {config.sections.map((section, i) => [
                ...(i > 0
                  ? [<Sidebar.Separator key={`sep-${section.label}`} />]
                  : []),
                <Sidebar.GroupLabel key={`label-${section.label}`}>
                  {section.label}
                </Sidebar.GroupLabel>,
                ...renderNav(section.items, config.base),
              ])}
            </Sidebar.Nav>
            <Sidebar.Footer>
              <Stack space={2} alignX="left">
                <LinkButton href={leaf?.docsHref ?? '/'} variant="ghost">
                  <ArrowLeft />
                  {`Go to ${leaf?.docsLabel ?? 'documentation'}`}
                </LinkButton>
                <LinkButton
                  href="/getting-started/get-in-touch"
                  variant="ghost"
                >
                  <LifeBuoy />
                  Get in touch
                </LinkButton>
              </Stack>
            </Sidebar.Footer>
          </AppLayout.Sidebar>
          <AppLayout.Header>
            <TopNavigation.Start>
              <Sidebar.Toggle />
            </TopNavigation.Start>
            <TopNavigation.Middle>
              <Breadcrumbs>
                <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
                {ancestors.map(label => (
                  <Breadcrumbs.Item key={label} href="#">
                    {label}
                  </Breadcrumbs.Item>
                ))}
                {leaf && (
                  <Breadcrumbs.Item href="#">{leaf.label}</Breadcrumbs.Item>
                )}
              </Breadcrumbs>
            </TopNavigation.Middle>
            <TopNavigation.End>
              <UserSection />
            </TopNavigation.End>
          </AppLayout.Header>
          <AppLayout.Main>{children}</AppLayout.Main>
        </AppLayout>
      </Sidebar.Provider>
    </RouterProvider>
  );
};
