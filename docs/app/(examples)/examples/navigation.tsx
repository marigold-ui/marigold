'use client';

import { PanelsTopLeft, Puzzle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@marigold/components';
import type { NavSection, ShellConfig } from '../_shared';
import { AppShellNav, appShellPages } from '../_shared';

const appShell: NavSection = {
  label: 'App Shell',
  icon: PanelsTopLeft,
  nav: AppShellNav,
  pages: appShellPages,
};

const PatternsNav = ({ base }: { base: string }) => {
  const pathname = usePathname();

  return [
    <Sidebar.Item
      key="filter"
      href={`${base}/filter`}
      active={pathname === `${base}/filter`}
    >
      Filter
    </Sidebar.Item>,
    <Sidebar.Item
      key="form"
      href={`${base}/form`}
      active={pathname === `${base}/form`}
    >
      Form
    </Sidebar.Item>,
    <Sidebar.Item
      key="inventory"
      href={`${base}/inventory`}
      active={pathname === `${base}/inventory`}
    >
      Inventory
    </Sidebar.Item>,
  ];
};

const patterns: NavSection = {
  label: 'Patterns',
  icon: Puzzle,
  nav: PatternsNav,
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
