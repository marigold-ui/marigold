'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@marigold/components';
import type { PageMeta } from './shell-types';

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

export const AppShellNav = ({ base }: { base: string }) => {
  const pathname = usePathname();

  return [
    <Sidebar.Item key="dashboard" href={base} active={pathname === base}>
      Dashboard
    </Sidebar.Item>,
    <Sidebar.Item
      key="analytics"
      href={`${base}/analytics`}
      active={pathname === `${base}/analytics`}
    >
      Analytics
    </Sidebar.Item>,
    <Sidebar.Separator key="sep" />,
    <Sidebar.Item key="management" textValue="Management">
      Management
      <Sidebar.Item
        href={`${base}/users`}
        active={pathname === `${base}/users`}
      >
        Users
      </Sidebar.Item>
      <Sidebar.Item
        href={`${base}/teams`}
        active={pathname === `${base}/teams`}
      >
        Teams
      </Sidebar.Item>
      <Sidebar.Item
        href={`${base}/billing`}
        active={pathname === `${base}/billing`}
      >
        Billing
      </Sidebar.Item>
    </Sidebar.Item>,
    <Sidebar.GroupLabel key="settings-label">Settings</Sidebar.GroupLabel>,
    <Sidebar.Item
      key="general"
      href={`${base}/general`}
      active={pathname === `${base}/general`}
    >
      General
    </Sidebar.Item>,
    <Sidebar.Item
      key="security"
      href={`${base}/security`}
      active={pathname === `${base}/security`}
    >
      Security
    </Sidebar.Item>,
  ];
};
