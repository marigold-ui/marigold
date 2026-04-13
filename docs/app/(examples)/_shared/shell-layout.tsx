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
import type { NavSection, PageMeta, ShellConfig } from './shell-types';
import { UserMenu } from './user-menu';

// Helpers
// ---------------
const getActiveSection = (sections: NavSection[], slug: string) =>
  sections.find(s => slug in s.pages) ?? sections[0];

const getFirstSlug = (section: NavSection) =>
  Object.keys(section.pages)[0] ?? '';

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
  page,
  onSwitch,
}: {
  sections: NavSection[];
  page?: PageMeta;
  onSwitch: (sectionLabel: string) => void;
}) => {
  if (sections.length <= 1 && !page?.docsHref) return null;

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
      {page?.docsHref && (
        <Menu.Item href={page.docsHref}>
          <Inline space={2} alignY="center">
            <ArrowLeft size={16} />
            {page.docsLabel ?? 'Back to docs'}
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
  const activeSection = getActiveSection(config.sections, slug);
  const page = activeSection.pages[slug];

  const handleSectionSwitch = (key: string) => {
    const section = config.sections.find(s => s.label === key);
    if (section) {
      router.push(`${config.base}/${getFirstSlug(section)}`);
    }
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
              <activeSection.nav base={config.base} />
            </Sidebar.Nav>
            <Sidebar.Footer>
              <SectionSwitcher
                sections={config.sections}
                page={page}
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
