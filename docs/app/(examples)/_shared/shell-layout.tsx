'use client';

import { ArrowLeft } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppLayout,
  Badge,
  Breadcrumbs,
  Inline,
  Menu,
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

// Tree walkers
// ---------------
const findLeaf = (
  items: NavNode[],
  slug: string,
  ancestors: string[] = []
): { leaf: LeafItem; ancestors: string[] } | null => {
  for (const item of items) {
    if (item.kind !== 'Item') continue;
    if (item.children) {
      const found = findLeaf(item.children, slug, [...ancestors, item.label]);
      if (found) return found;
    } else if (item.slug === slug) {
      return { leaf: item, ancestors };
    }
  }
  return null;
};

const findActive = (sections: NavSection[], slug: string) => {
  for (const section of sections) {
    const found = findLeaf(section.items, slug);
    if (found) return { section, ...found };
  }
  return { section: sections[0], leaf: undefined, ancestors: [] as string[] };
};

const findFirstSlug = (items: NavNode[]): string | undefined => {
  for (const item of items) {
    if (item.kind !== 'Item') continue;
    if (item.children) {
      const nested = findFirstSlug(item.children);
      if (nested !== undefined) return nested;
    } else {
      return item.slug;
    }
  }
  return undefined;
};

// Nav renderer
// ---------------
const renderNav = (
  items: NavNode[],
  ctx: { base: string; pathname: string }
): ReactNode[] =>
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
          {renderNav(item.children, ctx)}
        </Sidebar.Item>
      );
    }
    const href = item.slug ? `${ctx.base}/${item.slug}` : ctx.base;
    return (
      <Sidebar.Item
        key={`leaf-${item.slug}`}
        href={href}
        active={ctx.pathname === href}
      >
        {item.label}
      </Sidebar.Item>
    );
  });

// User Section
// ---------------
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

// Section Switcher
// ---------------
const SectionSwitcher = ({
  sections,
  leaf,
  onSwitch,
}: {
  sections: NavSection[];
  leaf?: LeafItem;
  onSwitch: (sectionLabel: string) => void;
}) => {
  if (sections.length <= 1 && !leaf?.docsHref) return null;

  return (
    <Menu
      label="Navigate to…"
      variant="ghost"
      placement="right bottom"
      aria-label="Switch section"
      onAction={key => onSwitch(key as string)}
    >
      {sections.map(section => {
        const Icon = section.icon;
        return (
          <Menu.Item key={section.label} id={section.label}>
            <Inline space={2} alignY="center">
              {Icon && <Icon size={16} />}
              {section.label}
            </Inline>
          </Menu.Item>
        );
      })}
      {leaf?.docsHref && (
        <Menu.Item href={leaf.docsHref}>
          <Inline space={2} alignY="center">
            <ArrowLeft size={16} />
            {leaf.docsLabel ?? 'Back to docs'}
          </Inline>
        </Menu.Item>
      )}
    </Menu>
  );
};

// Shell Layout
// ---------------
export const ShellLayout = ({
  config,
  children,
}: PropsWithChildren<{ config: ShellConfig }>) => {
  const pathname = usePathname();
  const router = useRouter();

  const slug = pathname.replace(config.base, '').replace(/^\//, '');
  const { section, leaf, ancestors } = findActive(config.sections, slug);

  const handleSectionSwitch = (key: string) => {
    const next = config.sections.find(s => s.label === key);
    if (!next) return;
    const firstSlug = findFirstSlug(next.items);
    router.push(firstSlug ? `${config.base}/${firstSlug}` : config.base);
  };

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
            <Sidebar.Nav>
              {renderNav(section.items, { base: config.base, pathname })}
            </Sidebar.Nav>
            <Sidebar.Footer>
              <SectionSwitcher
                sections={config.sections}
                leaf={leaf}
                onSwitch={handleSectionSwitch}
              />
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
