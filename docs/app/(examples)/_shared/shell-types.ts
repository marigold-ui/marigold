import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export interface PageMeta {
  label: string;
  parent?: string;
  docsHref?: string;
  docsLabel?: string;
}

export interface NavProps {
  base: string;
}

export interface NavSection {
  label: string;
  icon?: LucideIcon;
  nav: ComponentType<NavProps>;
  pages: Record<string, PageMeta>;
}

export interface ShellConfig {
  base: string;
  sections: NavSection[];
}
