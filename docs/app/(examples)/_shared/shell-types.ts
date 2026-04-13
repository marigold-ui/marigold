import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface PageMeta {
  label: string;
  parent?: string;
  docsHref?: string;
  docsLabel?: string;
}

export interface NavContext {
  base: string;
  activeSlug: string;
}

export interface NavSection {
  label: string;
  icon?: LucideIcon;
  nav: (ctx: NavContext) => ReactNode;
  pages: Record<string, PageMeta>;
}

export interface ShellConfig {
  base: string;
  sections: NavSection[];
}
