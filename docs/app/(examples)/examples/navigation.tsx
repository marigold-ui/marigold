import { PanelsTopLeft, Puzzle } from 'lucide-react';
import { Sidebar } from '@marigold/components';
import type { NavSection, ShellConfig } from '../_shared';
import { appShellNav, appShellPages } from '../_shared';

const appShell: NavSection = {
  label: 'App Shell',
  icon: PanelsTopLeft,
  nav: appShellNav,
  pages: appShellPages,
};

const patterns: NavSection = {
  label: 'Patterns',
  icon: Puzzle,
  nav: ({ base, activeSlug }) => (
    <>
      <Sidebar.Item href={`${base}/filter`} active={activeSlug === 'filter'}>
        Filter
      </Sidebar.Item>
      <Sidebar.Item href={`${base}/form`} active={activeSlug === 'form'}>
        Form
      </Sidebar.Item>
      <Sidebar.Item
        href={`${base}/inventory`}
        active={activeSlug === 'inventory'}
      >
        Inventory
      </Sidebar.Item>
    </>
  ),
  pages: {
    filter: {
      label: 'Filter',
      docsHref: '/patterns/filter',
      docsLabel: 'Filter Guidelines',
    },
    form: {
      label: 'Form',
      docsHref: '/patterns/form-implementation',
      docsLabel: 'Form Guidelines',
    },
    inventory: { label: 'Inventory' },
  },
};

export const config: ShellConfig = {
  base: '/examples',
  sections: [appShell, patterns],
};
