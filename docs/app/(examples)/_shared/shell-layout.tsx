'use client';

import type { PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppLayout,
  Badge,
  Breadcrumbs,
  Inline,
  RouterProvider,
  Select,
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
const getActiveSection = (sections: NavSection[], slug: string) =>
  sections.find(s => s.slugs.includes(slug)) ?? sections[0];

const getFirstSlug = (section: NavSection) => section.slugs[0] ?? '';

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
const BACK_TO_DOCS = '__back_to_docs__';

const SectionSwitcher = ({
  sections,
  activeSection,
  docsHref,
  onSwitch,
}: {
  sections: NavSection[];
  activeSection: NavSection;
  docsHref?: string;
  onSwitch: (sectionLabel: string) => void;
}) => {
  if (sections.length <= 1) return null;

  return (
    <div className="px-2 pb-2">
      <Select
        aria-label="Switch section"
        selectedKey={activeSection.label}
        onSelectionChange={key => onSwitch(key as string)}
        width="full"
      >
        <Select.Section>
          {sections.map(section => (
            <Select.Option key={section.label} id={section.label}>
              {section.label}
            </Select.Option>
          ))}
        </Select.Section>
        {docsHref && (
          <Select.Section>
            <Select.Option id={BACK_TO_DOCS}>&larr; Back to docs</Select.Option>
          </Select.Section>
        )}
      </Select>
    </div>
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
    if (sectionLabel === BACK_TO_DOCS && page?.docsHref) {
      window.location.href = page.docsHref;
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
            <SectionSwitcher
              sections={config.sections}
              activeSection={activeSection}
              docsHref={page?.docsHref}
              onSwitch={handleSectionSwitch}
            />
            <SidebarNav nav={activeSection.nav} activeSlug={slug} />
            <Sidebar.Footer />
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
