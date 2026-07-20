import { cloneElement, useLayoutEffect, useRef } from 'react';
import type { ReactNode, Ref } from 'react';
import { Focusable } from 'react-aria-components/Focusable';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { isFocusVisible } from '@react-aria/interactions';
import { handleLinkClick, useLinkProps, useRouter } from '@react-aria/utils';
import { cn } from '@marigold/system';
import { Tooltip } from '../Tooltip/Tooltip';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarModal } from './SidebarModal';
import type { SidebarCurrent } from './collection';
import { activateOnEnterOrSpace, isModifiedClick } from './linkActivation';
import { resolveRailActivation } from './railActivation';
import type { SidebarRailNode } from './railCollection';
import { useSidebarRailState } from './useSidebarRailState';

export interface SidebarRailProps {
  /**
   * The rail contents: `Sidebar.RailItem`s, optionally a `Sidebar.Footer`
   * whose rail items render pinned at the bottom of the rail (same tile, e.g.
   * a help center), and optionally a `Sidebar.Header` shown in the mobile
   * drawer (on desktop the brand lives in the top bar). A `RailItem` wrapping
   * a `Sidebar.Nav` is a section (shows a panel); one with only an `href` is a
   * direct link.
   */
  children?: ReactNode;
  /** Accessible label for the rail landmark. Defaults to a localized "Primary navigation". */
  'aria-label'?: string;
  /**
   * Marks the active rail item and panel leaf. Pass the current pathname (smart
   * segment matching) or a predicate `(href, key) => boolean`.
   */
  current?: SidebarCurrent;
  ref?: Ref<HTMLElement>;
}

interface RailItemLinkProps {
  node: SidebarRailNode;
  /** Drives the pill — the user's current selection (optimistic). */
  selected: boolean;
  /** Drives `aria-current` — the item that matches the live page. */
  matched: boolean;
  /** Runs on activation; returns whether the click should still navigate. */
  onActivate: () => boolean;
  /**
   * Icon-only rail: enables the tooltip as the hover/focus hint. The label
   * itself stays mounted — the theme folds its row away and fades it to
   * opacity-0 (still the accessible name), so the tiles glide into the dense
   * icon-only pitch instead of jumping.
   */
  collapsed: boolean;
  className: string;
}

/**
 * A single rail destination: a plain, always-tabbable link (the rail is a flat
 * list, unlike the panel's roving tree). The icon sits above a visible label,
 * which is also the accessible name.
 */
const RailItemLink = ({
  node,
  selected,
  matched,
  onActivate,
  collapsed,
  className,
}: RailItemLinkProps) => {
  const router = useRouter();
  const routerLinkProps = useLinkProps({ href: node.href });

  // The leaf is the true current page (marked in the panel); a section rail item
  // is only its ancestor, so it announces `true`, not `page`. A direct-link rail
  // item that is itself the page announces `page`.
  const ariaCurrent = matched ? (node.isSection ? 'true' : 'page') : undefined;

  // The trigger stays mounted in both states (only `disabled` flips) so the
  // anchor never remounts mid-collapse, which would cut the glide transition.
  return (
    <Tooltip.Trigger disabled={!collapsed}>
      <Focusable>
        <a
          {...routerLinkProps}
          href={node.href}
          role={node.href ? undefined : 'button'}
          aria-current={ariaCurrent}
          data-active={selected || undefined}
          className={className}
          onClick={e => {
            // Browser-owned clicks (new tab/window) keep native anchor
            // behavior; rail state (selection, panel, drawer) stays untouched.
            if (node.href && isModifiedClick(e)) return;
            const shouldNavigate = onActivate();
            node.onPress?.();
            // Re-clicking the active section only toggles the panel — don't let
            // the anchor navigate away from a deeper page the user is already on.
            if (shouldNavigate) {
              handleLinkClick(e, router, node.href, undefined);
            } else {
              e.preventDefault();
            }
          }}
          onKeyDown={node.href ? undefined : activateOnEnterOrSpace}
        >
          {node.icon}
          <span>{node.textValue}</span>
        </a>
      </Focusable>
      <Tooltip placement="right">{node.textValue}</Tooltip>
    </Tooltip.Trigger>
  );
};

/**
 * `Sidebar.Rail` — the two-level sidebar: a persistent rail of top-level
 * destinations next to a panel showing the active section's sub-navigation.
 *
 * `Sidebar.Toggle` / Cmd+B collapse the **panel** (the rail stays put): in this
 * mode the shared expanded/collapsed state is read as panel visibility.
 */
const SidebarRail = ({
  children,
  'aria-label': ariaLabel,
  current,
  ref,
}: SidebarRailProps) => {
  const { classNames, isMobile, state, toggleSidebar } = useSidebar();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const {
    nodes,
    header,
    footer,
    matchedKey,
    selectedKey,
    selectedNode,
    selectRail,
  } = useSidebarRailState({ children, current });

  const titleRef = useRef<HTMLHeadingElement>(null);
  // Set when a user rail action should move focus to the panel heading; the
  // effect below acts on it once the panel is shown. Route-driven or mount
  // selection never sets it, so focus is never stolen unprompted.
  const focusPendingRef = useRef(false);

  // On mobile `state` means drawer visibility, not panel visibility — inside
  // the open drawer the active section's panel is always shown.
  const hasPanel =
    (selectedNode?.isSection ?? false) && (isMobile || state === 'expanded');

  const footerNodes = nodes.filter(node => node.inFooter);

  useLayoutEffect(() => {
    if (!focusPendingRef.current || !hasPanel) return;
    focusPendingRef.current = false;
    titleRef.current?.focus({ focusVisible: isFocusVisible() } as FocusOptions);
  }, [hasPanel, selectedKey]);

  // The mobile drawer renders no RAC Dialog, so nothing autofocuses on open —
  // move focus to the panel heading (or the first rail link on a page without
  // a panel) so Escape and screen readers land inside the modal right away.
  const mobileBodyRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!isMobile || state !== 'expanded') return;
    const target =
      titleRef.current ?? mobileBodyRef.current?.querySelector('a');
    target?.focus({ focusVisible: isFocusVisible() } as FocusOptions);
  }, [isMobile, state]);

  // Returns whether the click should navigate (false = re-click toggle only).
  // The decision matrix lives in `resolveRailActivation` (pure, unit-tested);
  // this only maps its result onto the rail's state and refs.
  const activateRail = (node: SidebarRailNode): boolean => {
    const action = resolveRailActivation(node, {
      isMobile,
      selectedKey,
      state,
    });
    if (action.select) selectRail(node.key);
    if (action.focusPanel) focusPendingRef.current = true;
    if (action.toggle) toggleSidebar();
    return action.navigate;
  };

  // The rail column is identical in both shells; only the icon-only collapse
  // is desktop's (the drawer always shows labels, so tooltips stay disabled).
  const railColumn = (collapsed: boolean) => (
    <div className={classNames.railColumn}>
      <nav
        aria-label={ariaLabel || stringFormatter.format('railNavigation')}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className={classNames.rail}>
          {nodes
            .filter(node => !node.inFooter)
            .map(node => (
              <RailItemLink
                key={node.key}
                node={node}
                selected={selectedKey === node.key}
                matched={matchedKey === node.key}
                onActivate={() => activateRail(node)}
                collapsed={collapsed}
                className={classNames.railItem}
              />
            ))}
        </div>
        {/* Pinned below the scrolling list: rail items declared inside
            Sidebar.Footer (same tile, same behavior) plus any raw footer
            content. */}
        {footerNodes.length > 0 || footer ? (
          <div className={classNames.railFooter}>
            {footerNodes.map(node => (
              <RailItemLink
                key={node.key}
                node={node}
                selected={selectedKey === node.key}
                matched={matchedKey === node.key}
                onActivate={() => activateRail(node)}
                collapsed={collapsed}
                className={classNames.railItem}
              />
            ))}
            {footer}
          </div>
        ) : null}
      </nav>
    </div>
  );

  const panelBody =
    selectedNode?.isSection && selectedNode.nav ? (
      <>
        <h2 ref={titleRef} tabIndex={-1} className={classNames.panelTitle}>
          {selectedNode.panelTitle}
        </h2>
        {cloneElement(selectedNode.nav, { current })}
      </>
    ) : null;

  // Mobile: the drawer contains a miniature of the desktop layout — the
  // icon+label rail on its left edge, the active section's panel beside it.
  // Section taps swap the panel in place; leaf links close the drawer (via
  // SidebarPanel's own mobile handling).
  if (isMobile) {
    return (
      <SidebarModal ref={ref} partial>
        {header}
        <div
          ref={mobileBodyRef}
          // The rail is never icon-only inside the drawer; the tiles read
          // this ancestor state for their label row (and railLayout resolves
          // --rail-w to its expanded width).
          data-state="expanded"
          className={cn(
            'grid h-full min-h-0 grid-cols-[var(--rail-w)_1fr] [grid-area:content]',
            classNames.railLayout
          )}
        >
          {railColumn(false)}
          <div
            // The drawer's edge is the boundary here — the desktop panel
            // divider would double it.
            className={cn(classNames.panel, 'border-r-0')}
          >
            {panelBody}
          </div>
        </div>
      </SidebarModal>
    );
  }

  return (
    <aside
      ref={ref}
      aria-label={stringFormatter.format('sidebar')}
      // AppShell's grid switches to the header-first template when it sees
      // this attribute (pure CSS, via `:has()`).
      data-rail=""
      data-state={state}
      className={cn(
        // The full-width top bar spans above the rail (AppShell's header-first
        // grid), so the aside starts below it and sticks to that offset.
        'top-topbar sticky h-[calc(100dvh-var(--spacing-topbar))] self-start [grid-area:sidebar]',
        classNames.railRoot
      )}
    >
      <div
        data-state={state}
        data-panel={hasPanel ? 'expanded' : 'collapsed'}
        // Column widths (and their collapse transition) come from the theme's
        // railLayout recipe as --rail-w/--panel-w; the grid only consumes them.
        className={cn(
          'grid h-full grid-cols-[var(--rail-w)_var(--panel-w)]',
          classNames.railLayout
        )}
      >
        {/* Rail column: draws the always-on divider between the rail and
            everything to its right, starting under the top bar. The toggle
            lives in the top bar (Sidebar.Toggle in TopNavigation.Start), not
            here. */}
        {railColumn(state === 'collapsed')}

        <div inert={!hasPanel || undefined} className={classNames.panel}>
          {panelBody}
        </div>
      </div>
    </aside>
  );
};

// Brand for `Sidebar`'s rail-mode detection — reference identity (`child.type
// === SidebarRail`) breaks across HOC wrappers and duplicate package installs.
SidebarRail.__SIDEBAR_RAIL__ = true as const;

export { SidebarRail };
