import type { LucideIcon } from 'lucide-react';

export type NavNode =
  | {
      kind: 'Item';
      slug: string;
      label: string;
      docsHref?: string;
      docsLabel?: string;
      children?: never;
    }
  | {
      kind: 'Item';
      label: string;
      children: NavNode[];
      slug?: never;
      docsHref?: never;
      docsLabel?: never;
    }
  | { kind: 'GroupLabel'; label: string }
  | { kind: 'Separator' };

export interface NavSection {
  label: string;
  icon?: LucideIcon;
  items: NavNode[];
}

export interface ShellConfig {
  base: string;
  sections: NavSection[];
}
