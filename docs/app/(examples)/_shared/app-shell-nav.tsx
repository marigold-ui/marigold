'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@marigold/components';
import type { NavProps, PageMeta } from './shell-types';

const docs = {
  docsHref: '/patterns/app-shell',
  docsLabel: 'App Shell Pattern',
};

export const appShellPages: Record<string, PageMeta> = {
  '': { label: 'Dashboard', ...docs },
  analytics: { label: 'Analytics', ...docs },
  users: { label: 'Users', parent: 'Management', ...docs },
  teams: { label: 'Teams', parent: 'Management', ...docs },
  billing: { label: 'Billing', parent: 'Management', ...docs },
  general: { label: 'General', parent: 'Settings', ...docs },
  security: { label: 'Security', parent: 'Settings', ...docs },
};

export const AppShellNav = ({ base }: NavProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <Sidebar.Item href={`${base}/`} active={isActive(`${base}/`)}>
        Dashboard
      </Sidebar.Item>
      <Sidebar.Item
        href={`${base}/analytics`}
        active={isActive(`${base}/analytics`)}
      >
        Analytics
      </Sidebar.Item>
      <Sidebar.Separator />
      <Sidebar.Item textValue="Management">
        Management
        <Sidebar.Item href={`${base}/users`} active={isActive(`${base}/users`)}>
          Users
        </Sidebar.Item>
        <Sidebar.Item href={`${base}/teams`} active={isActive(`${base}/teams`)}>
          Teams
        </Sidebar.Item>
        <Sidebar.Item
          href={`${base}/billing`}
          active={isActive(`${base}/billing`)}
        >
          Billing
        </Sidebar.Item>
      </Sidebar.Item>
      <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
      <Sidebar.Item
        href={`${base}/general`}
        active={isActive(`${base}/general`)}
      >
        General
      </Sidebar.Item>
      <Sidebar.Item
        href={`${base}/security`}
        active={isActive(`${base}/security`)}
      >
        Security
      </Sidebar.Item>
    </>
  );
};
