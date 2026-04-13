import { Sidebar } from '@marigold/components';
import type { NavHelpers, PageMeta } from './shell-types';

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

export const appShellNav = ({ item }: NavHelpers) => (
  <>
    {item('', 'Dashboard')}
    {item('analytics', 'Analytics')}
    <Sidebar.Separator />
    <Sidebar.Item textValue="Management">
      Management
      {item('users', 'Users')}
      {item('teams', 'Teams')}
      {item('billing', 'Billing')}
    </Sidebar.Item>
    <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
    {item('general', 'General')}
    {item('security', 'Security')}
  </>
);
