'use client';

import type { PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppLayout,
  Badge,
  Breadcrumbs,
  Inline,
  RouterProvider,
  Sidebar,
  Stack,
  Text,
  TopNavigation,
} from '@marigold/components';
import { UserMenu } from '../user-menu';
import { BASE, pages } from './navigation';

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

const findSlugByLabel = (label: string) =>
  Object.entries(pages).find(([, p]) => p.label === label)?.[0];

const ShellLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const slug = pathname.replace(BASE, '').replace(/^\//, '');
  const page = pages[slug];

  return (
    <RouterProvider navigate={href => router.push(`${BASE}${href}`)}>
      <Sidebar.Provider defaultOpen>
        <AppLayout>
          <AppLayout.Sidebar>
            <Sidebar>
              <Sidebar.Header>
                <Inline space={2} alignY="center" noWrap>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                    fill="none"
                    className="size-8 shrink-0"
                  >
                    <rect width="36" height="36" rx="8" fill="currentColor" />
                    <path
                      d="M18 8L26 26H10L18 8Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Text weight="bold" fontSize="lg">
                    Acme Inc.
                  </Text>
                </Inline>
              </Sidebar.Header>
              <Sidebar.Nav>
                <Sidebar.Item href="/" active={slug === ''}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item href="/analytics" active={slug === 'analytics'}>
                  Analytics
                </Sidebar.Item>
                <Sidebar.Item
                  href="/discounts"
                  active={slug === 'discounts' || slug.startsWith('discounts/')}
                >
                  Discounts
                </Sidebar.Item>
                <Sidebar.Separator />
                <Sidebar.Item id="management" textValue="Management">
                  Management
                  <Sidebar.Item href="/users" active={slug === 'users'}>
                    Users
                  </Sidebar.Item>
                  <Sidebar.Item href="/teams" active={slug === 'teams'}>
                    Teams
                  </Sidebar.Item>
                  <Sidebar.Item href="/billing" active={slug === 'billing'}>
                    Billing
                  </Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
                <Sidebar.Item href="/general" active={slug === 'general'}>
                  General
                </Sidebar.Item>
                <Sidebar.Item href="/security" active={slug === 'security'}>
                  Security
                </Sidebar.Item>
              </Sidebar.Nav>
              <Sidebar.Footer>
                <Text fontSize="xs">v1.0.0</Text>
              </Sidebar.Footer>
            </Sidebar>
          </AppLayout.Sidebar>
          <AppLayout.Header>
            <TopNavigation>
              <TopNavigation.Start>
                <Sidebar.Toggle />
              </TopNavigation.Start>
              <TopNavigation.Middle>
                <Breadcrumbs maxVisibleItems={3}>
                  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                  {page?.parent &&
                    (() => {
                      const parentSlug = findSlugByLabel(page.parent);
                      return (
                        <Breadcrumbs.Item
                          href={
                            parentSlug !== undefined ? `/${parentSlug}` : '#'
                          }
                        >
                          {page.parent}
                        </Breadcrumbs.Item>
                      );
                    })()}
                  <Breadcrumbs.Item href="#">{page?.label}</Breadcrumbs.Item>
                </Breadcrumbs>
              </TopNavigation.Middle>
              <TopNavigation.End>
                <UserSection />
              </TopNavigation.End>
            </TopNavigation>
          </AppLayout.Header>
          <AppLayout.Main>{children}</AppLayout.Main>
        </AppLayout>
      </Sidebar.Provider>
    </RouterProvider>
  );
};

export default ShellLayout;
