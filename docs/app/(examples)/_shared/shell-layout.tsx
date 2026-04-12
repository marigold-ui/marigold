'use client';

import { ArrowLeft } from 'lucide-react';
import type { PropsWithChildren } from 'react';
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
import type { NavEntry, NavSection, ShellConfig } from './shell-types';
import { UserMenu } from './user-menu';

// Helpers
// ---------------
const getSlugs = (nav: NavEntry[]): string[] =>
  nav.flatMap(entry => {
    switch (entry.type) {
      case 'item':
        return [entry.slug];
      case 'group':
      case 'label-group':
        return entry.children.map(c => c.slug);
      case 'separator':
        return [];
    }
  });

const getActiveSection = (sections: NavSection[], slug: string) =>
  sections.find(s => getSlugs(s.nav).includes(slug)) ?? sections[0];

const getFirstSlug = (section: NavSection) => getSlugs(section.nav)[0] ?? '';

const BACK_TO_DOCS = '__back_to_docs__';

// Sidebar Nav
// ---------------
const SidebarNav = ({
  nav,
  activeSlug,
}: {
  nav: NavEntry[];
  activeSlug: string;
}) => (
  <Sidebar.Nav>
    {nav.map((entry, i) => {
      switch (entry.type) {
        case 'item':
          return (
            <Sidebar.Item
              key={entry.slug}
              href={`/${entry.slug}`}
              active={activeSlug === entry.slug}
            >
              {entry.label}
            </Sidebar.Item>
          );
        case 'group':
          return (
            <Sidebar.Item
              key={entry.label}
              id={entry.label.toLowerCase()}
              textValue={entry.label}
            >
              {entry.label}
              {entry.children.map(child => (
                <Sidebar.Item
                  key={child.slug}
                  href={`/${child.slug}`}
                  active={activeSlug === child.slug}
                >
                  {child.label}
                </Sidebar.Item>
              ))}
            </Sidebar.Item>
          );
        case 'label-group':
          return (
            <div key={entry.label}>
              <Sidebar.GroupLabel>{entry.label}</Sidebar.GroupLabel>
              {entry.children.map(child => (
                <Sidebar.Item
                  key={child.slug}
                  href={`/${child.slug}`}
                  active={activeSlug === child.slug}
                >
                  {child.label}
                </Sidebar.Item>
              ))}
            </div>
          );
        case 'separator':
          return <Sidebar.Separator key={`sep-${i}`} />;
      }
    })}
  </Sidebar.Nav>
);

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
  activeSection,
  onSwitch,
}: {
  sections: NavSection[];
  activeSection: NavSection;
  onSwitch: (sectionLabel: string) => void;
}) => {
  if (sections.length <= 1) return null;

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
      {activeSection.docsHref && (
        <Menu.Item id={BACK_TO_DOCS}>
          <Inline space={2} alignY="center">
            <ArrowLeft size={16} />
            Go to {activeSection.label} Docs
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
  const page = config.pages[slug];
  const activeSection = getActiveSection(config.sections, slug);

  const handleSectionSwitch = (sectionLabel: string) => {
    if (sectionLabel === BACK_TO_DOCS && activeSection.docsHref) {
      window.location.href = activeSection.docsHref;
      return;
    }
    const section = config.sections.find(s => s.label === sectionLabel);
    if (section) {
      const firstSlug = getFirstSlug(section);
      router.push(`${config.base}/${firstSlug}`);
    }
  };

  return (
    <RouterProvider navigate={href => router.push(`${config.base}${href}`)}>
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
            <SidebarNav nav={activeSection.nav} activeSlug={slug} />
            <Sidebar.Footer>
              <SectionSwitcher
                sections={config.sections}
                activeSection={activeSection}
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
                {page?.parent && (
                  <Breadcrumbs.Item href="#">{page.parent}</Breadcrumbs.Item>
                )}
                <Breadcrumbs.Item href="#">{page?.label}</Breadcrumbs.Item>
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
