import { cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { SidebarNavProps } from './SidebarNav';
import type { SidebarRailItemProps } from './SidebarRailItem';
import {
  buildCollection,
  collectLeaves,
  extractTextValue,
  firstLeafHref,
  flattenChildren,
  matchLeaves,
  normalizePath,
} from './collection';
import type { SidebarCurrent } from './collection';

/**
 * A resolved rail item.
 *
 * - A **section** owns a nested `Sidebar.Nav` (`nav`), rendered in the panel; its
 *   `leaves` drive active-ancestor resolution and `href` is the landing page.
 * - A **direct link** has an `href` and no `nav`; it navigates and shows no panel.
 */
export interface SidebarRailNode {
  type: 'railItem';
  key: string;
  /** Full accessible name (tooltip + `aria-label`). */
  textValue: string;
  /** Rail label content (the text shown under the icon). */
  label: ReactNode[];
  icon: ReactNode;
  /** Resolved landing destination: explicit `href`, else the section's first leaf. */
  href?: string;
  onPress?: () => void;
  active?: boolean;
  isSection: boolean;
  /** The section's `Sidebar.Nav` element, rendered as-is in the panel. */
  nav?: ReactElement<SidebarNavProps>;
  /** Panel heading: the nav's `aria-label`, falling back to the item's text. */
  panelTitle?: string;
  /** Section leaves (original keys) used to resolve the active ancestor. */
  leaves: { key: string; href?: string }[];
  /**
   * True for a `Sidebar.RailItem` declared inside `Sidebar.Footer`: rendered
   * pinned at the bottom of the rail (same tile, same behavior).
   */
  inFooter?: boolean;
}

export interface SidebarRailCollection {
  nodes: SidebarRailNode[];
  /** Brand slot (`Sidebar.Header`) rendered at the top of the rail. */
  header?: ReactNode;
  /** Footer slot (`Sidebar.Footer`) rendered at the bottom of the rail. */
  footer?: ReactNode;
}

// Type guards (brand-based, safe across HOCs and bundles)
const isSidebarRailItem = (
  child: ReactNode
): child is ReactElement<SidebarRailItemProps> =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_RAIL_ITEM__?: boolean }).__SIDEBAR_RAIL_ITEM__ ===
    true;

const isSidebarNav = (
  child: ReactNode
): child is ReactElement<SidebarNavProps> =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_NAV__?: boolean }).__SIDEBAR_NAV__ === true;

const isSidebarHeader = (child: ReactNode): child is ReactElement =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_HEADER__?: boolean }).__SIDEBAR_HEADER__ === true;

const isSidebarFooter = (child: ReactNode): child is ReactElement =>
  isValidElement(child) &&
  (child.type as { __SIDEBAR_FOOTER__?: boolean }).__SIDEBAR_FOOTER__ === true;

/**
 * Split a RailItem's children into its nested section nav (if any) and the rest
 * (the rail label content).
 */
const separateRailChildren = (
  children: ReactNode
): { nav?: ReactElement<SidebarNavProps>; label: ReactNode[] } => {
  let nav: ReactElement<SidebarNavProps> | undefined;
  const label: ReactNode[] = [];

  for (const child of flattenChildren(children)) {
    if (isSidebarNav(child)) {
      nav = child;
    } else {
      label.push(child);
    }
  }

  return { nav, label };
};

/**
 * Build the rail collection from `Sidebar.Rail` children: the brand/footer
 * slots plus one node per `Sidebar.RailItem`. Each section's nested nav is built
 * once to resolve its landing href and its leaves for active-state matching; the
 * nav element itself is kept and rendered as-is in the panel.
 *
 * `Sidebar.RailItem`s inside `Sidebar.Footer` become regular nodes flagged
 * `inFooter` — same tile, same matching/selection, just pinned to the bottom of
 * the rail. Any other footer content stays in the raw `footer` slot.
 */
export const buildRailCollection = (
  children: ReactNode
): SidebarRailCollection => {
  let header: ReactNode | undefined;
  let footer: ReactNode | undefined;
  const nodes: SidebarRailNode[] = [];
  let counter = 0;

  const buildNode = (
    child: ReactElement<SidebarRailItemProps>,
    inFooter?: boolean
  ): SidebarRailNode => {
    const { nav, label } = separateRailChildren(child.props.children);
    const key = child.props.id || `rail-${counter++}`;
    const textValue = child.props.textValue || extractTextValue(label);

    let href = child.props.href;
    let leaves: { key: string; href?: string }[] = [];
    let panelTitle: string | undefined;

    if (nav) {
      const section = buildCollection(nav.props.children);
      leaves = collectLeaves(section.rootNodes).map(leaf => ({
        key: leaf.key,
        href: leaf.href,
      }));
      if (!href) href = firstLeafHref(section.rootNodes);
      panelTitle = nav.props['aria-label'] || textValue;
    }

    return {
      type: 'railItem',
      key,
      textValue,
      label,
      icon: child.props.icon,
      href,
      onPress: child.props.onPress,
      active: child.props.active,
      isSection: !!nav,
      nav,
      panelTitle,
      leaves,
      inFooter,
    };
  };

  for (const child of flattenChildren(children)) {
    if (isSidebarHeader(child)) {
      header = child;
      continue;
    }
    if (isSidebarFooter(child)) {
      // Pull rail items out of the footer into first-class (pinned) nodes;
      // whatever else the footer holds keeps rendering as the raw slot.
      const footerKids = flattenChildren(
        (child.props as { children?: ReactNode }).children
      );
      for (const kid of footerKids) {
        if (isSidebarRailItem(kid)) nodes.push(buildNode(kid, true));
      }
      const rest = footerKids.filter(kid => !isSidebarRailItem(kid));
      footer = rest.length
        ? cloneElement(child, undefined, ...rest)
        : undefined;
      continue;
    }
    if (!isSidebarRailItem(child)) continue;

    nodes.push(buildNode(child));
  }

  return { nodes, header, footer };
};

/**
 * Resolve which rail item is the active ancestor of the current page.
 *
 * - An explicit `active` flag on a `Sidebar.RailItem` always wins — the escape
 *   hatch for a destination the URL can't identify (mirrors `Sidebar.Item`'s
 *   `active`). It works with or without a `current` value; the first flagged
 *   item in document order wins.
 * - **String mode** matches globally so the *longest* segment-prefix across all
 *   rail items wins, mirroring the single-column nav (`resolveCurrent`).
 * - **Function mode** returns the first rail item with a leaf (or direct-link
 *   href) the predicate accepts, keeping the item's original leaf keys intact.
 *
 * Returns the rail key to mark active, or `null` when nothing matches (the caller
 * falls back to the first section's panel without marking anything current).
 */
export const resolveActiveRail = (
  collection: SidebarRailCollection,
  current: SidebarCurrent | undefined
): string | null => {
  const explicit = collection.nodes.find(node => node.active);
  if (explicit) return explicit.key;

  if (current === undefined) return null;

  if (typeof current === 'function') {
    for (const node of collection.nodes) {
      if (node.isSection) {
        if (node.leaves.some(leaf => current(leaf.href, leaf.key))) {
          return node.key;
        }
      } else if (node.href && current(node.href, node.key)) {
        return node.key;
      }
    }
    return null;
  }

  // Flatten every matchable href into synthetic leaves, tracking which rail item
  // owns each, then run the shared longest-prefix matcher and trace the winner
  // back to its rail item. Synthetic keys avoid any collision with user ids.
  const tagged: { key: string; href?: string }[] = [];
  const owner = new Map<string, string>();
  let index = 0;
  for (const node of collection.nodes) {
    if (node.isSection) {
      for (const leaf of node.leaves) {
        const tag = `leaf-${index++}`;
        tagged.push({ key: tag, href: leaf.href });
        owner.set(tag, node.key);
      }
    } else if (node.href) {
      const tag = `leaf-${index++}`;
      tagged.push({ key: tag, href: node.href });
      owner.set(tag, node.key);
    }
  }

  // Cross-section duplicates never hit `resolveCurrent`'s per-nav warning
  // (only the selected section's nav renders), so check the whole rail here.
  if (process.env.NODE_ENV !== 'production') {
    const seen = new Map<string, string>();
    for (const leaf of tagged) {
      if (!leaf.href) continue;
      const href = normalizePath(leaf.href);
      const existing = seen.get(href);
      if (existing !== undefined) {
        console.error(
          `[Sidebar] Multiple rail destinations share the same href "${href}" ` +
            `(rail items: "${owner.get(existing)}", "${owner.get(leaf.key)}"). ` +
            `Active state matching will pick the first in document order. ` +
            `Each destination should have a unique href.`
        );
      } else {
        seen.set(href, leaf.key);
      }
    }
  }

  const matched = matchLeaves(tagged, current).values().next().value;
  return matched ? (owner.get(matched) ?? null) : null;
};
