'use client';

import { PanelsTopLeft, Puzzle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@marigold/components';
import type { NavProps, NavSection, ShellConfig } from '../_shared';
import { AppShellNav, appShellPages } from '../_shared';

const appShell: NavSection = {
  label: 'App Shell',
  icon: PanelsTopLeft,
  nav: AppShellNav,
  pages: appShellPages,
};

const PatternsNav = ({ base }: NavProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <Sidebar.Item href={`${base}/filter`} active={isActive(`${base}/filter`)}>
        Filter
      </Sidebar.Item>
      <Sidebar.Item href={`${base}/form`} active={isActive(`${base}/form`)}>
        Form
      </Sidebar.Item>
      <Sidebar.Item
        href={`${base}/inventory`}
        active={isActive(`${base}/inventory`)}
      >
        Inventory
      </Sidebar.Item>
    </>
  );
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
