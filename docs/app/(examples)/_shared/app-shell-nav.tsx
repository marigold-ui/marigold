import { Sidebar } from '@marigold/components';
import type { NavContext, PageMeta } from './shell-types';

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

export const appShellNav = ({ base, activeSlug }: NavContext) => (
  <>
    <Sidebar.Item href={`${base}/`} active={activeSlug === ''}>
      Dashboard
    </Sidebar.Item>
    <Sidebar.Item
      href={`${base}/analytics`}
      active={activeSlug === 'analytics'}
    >
      Analytics
    </Sidebar.Item>
    <Sidebar.Separator />
    <Sidebar.Item textValue="Management">
      Management
      <Sidebar.Item href={`${base}/users`} active={activeSlug === 'users'}>
        Users
      </Sidebar.Item>
      <Sidebar.Item href={`${base}/teams`} active={activeSlug === 'teams'}>
        Teams
      </Sidebar.Item>
      <Sidebar.Item href={`${base}/billing`} active={activeSlug === 'billing'}>
        Billing
      </Sidebar.Item>
    </Sidebar.Item>
    <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
    <Sidebar.Item href={`${base}/general`} active={activeSlug === 'general'}>
      General
    </Sidebar.Item>
    <Sidebar.Item href={`${base}/security`} active={activeSlug === 'security'}>
      Security
    </Sidebar.Item>
  </>
);
