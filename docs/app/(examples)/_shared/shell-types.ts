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
  items: NavNode[];
}

export interface ShellConfig {
  base: string;
  sections: NavSection[];
  /**
   * Resolves a dynamic path segment (e.g. a member id in `users/[id]`) to a
   * human label for the breadcrumb. Lets a drill-in route show a readable
   * trailing crumb without the page having to register it.
   */
  resolveLabel?: (segment: string) => string | undefined;
}
