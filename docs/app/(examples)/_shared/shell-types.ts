import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  type: 'item';
  label: string;
  slug: string;
}

export interface NavGroup {
  type: 'group';
  label: string;
  children: NavItem[];
}

export interface NavLabelGroup {
  type: 'label-group';
  label: string;
  children: NavItem[];
}

export interface NavSeparator {
  type: 'separator';
}

export type NavEntry = NavItem | NavGroup | NavLabelGroup | NavSeparator;

export interface NavSection {
  label: string;
  icon?: LucideIcon;
  nav: NavEntry[];
  docsHref?: string;
}

export interface ShellConfig {
  base: string;
  pages: Record<string, { label: string; parent?: string }>;
  sections: NavSection[];
}
