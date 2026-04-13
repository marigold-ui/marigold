import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface PageMeta {
  label: string;
  parent?: string;
  docsHref?: string;
  docsLabel?: string;
}

export interface NavHelpers {
  /** Build a `Sidebar.Item` linked to `${base}/${slug}` with active state resolved. */
  item: (slug: string, label: ReactNode) => ReactNode;
}

export interface NavSection {
  label: string;
  icon?: LucideIcon;
  nav: (helpers: NavHelpers) => ReactNode;
  pages: Record<string, PageMeta>;
}

export interface ShellConfig {
  base: string;
  sections: NavSection[];
}
