import type { ReactNode } from 'react';

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

/**
 * A top-level destination on the sidebar rail: either a direct link (one
 * standalone demo, no panel) or a section whose `items` become the panel's
 * sub-navigation.
 */
export type RailTile =
  | {
      kind: 'link';
      id: string;
      label: string;
      icon: ReactNode;
      slug: string;
      docsHref?: string;
      docsLabel?: string;
    }
  | {
      kind: 'section';
      id: string;
      label: string;
      icon: ReactNode;
      items: NavNode[];
    };

export interface ShellConfig {
  base: string;
  tiles: RailTile[];
  /**
   * Resolves a dynamic path segment (e.g. a member id in `users/[id]`) to a
   * human label for the breadcrumb. Lets a drill-in route show a readable
   * trailing crumb without the page having to register it.
   */
  resolveLabel?: (segment: string) => string | undefined;
}
