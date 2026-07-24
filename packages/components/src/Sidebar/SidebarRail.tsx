import { cloneElement, useLayoutEffect, useRef } from 'react';
import type { ReactNode, Ref } from 'react';
import { Focusable } from 'react-aria-components/Focusable';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { isFocusVisible } from '@react-aria/interactions';
import { handleLinkClick, useRouter } from '@react-aria/utils';
import { cn } from '@marigold/system';
import { Tooltip } from '../Tooltip/Tooltip';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarItem, SidebarSeparator } from './SidebarItem';
import { SidebarModal } from './SidebarModal';
import { SidebarNav } from './SidebarNav';
import type { SidebarCurrent } from './collection';
import { activateOnEnterOrSpace, isModifiedClick } from './linkActivation';
import { resolveRailActivation } from './railActivation';
import type { SidebarRailNode } from './railCollection';
import { usePanelKeyboard } from './useSidebarNav';
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

  // A section is only the current page's ancestor (`true`); a direct-link item
  // that is the page announces `page`. The leaf itself is marked in the panel.
  const ariaCurrent = matched ? (node.isSection ? 'true' : 'page') : undefined;

  // Keep the trigger mounted (only `disabled` flips) so the anchor doesn't
  // remount mid-collapse and cut the glide transition.
  return (
    <Tooltip.Trigger disabled={!collapsed}>
      <Focusable>
        <a
          href={node.href}
          role={node.href ? undefined : 'button'}
          aria-current={ariaCurrent}
          data-active={selected || undefined}
          className={className}
          onClick={e => {
            // New-tab/window clicks: let the browser navigate, touch no state.
            if (node.href && isModifiedClick(e)) return;
            const shouldNavigate = onActivate();
            node.onPress?.();
            // Re-clicking the active section only toggles the panel — don't
            // navigate away from the deeper page the user is on.
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
  // Set by a user action that should focus the panel heading; the effect below
  // consumes it once the panel shows. Route/mount changes never set it, so
  // focus is never stolen unprompted.
  const focusPendingRef = useRef(false);

  // Desktop-only concept: on mobile the drawer renders a drill-down nav
  // instead of a panel column.
  const hasPanel = (selectedNode?.isSection ?? false) && state === 'expanded';

  const footerNodes = nodes.filter(node => node.inFooter);

  // Arrow keys (+ Home/End) move between tiles on top of the rail's flat
  // tabbing — every tile stays a tab stop (no roving), arrows are a shortcut.
  const railNavRef = useRef<HTMLElement>(null);
  const { onKeyDown: onRailKeyDown } = usePanelKeyboard(railNavRef);

  useLayoutEffect(() => {
    if (!focusPendingRef.current || !hasPanel) return;
    focusPendingRef.current = false;
    titleRef.current?.focus({ focusVisible: isFocusVisible() } as FocusOptions);
  }, [hasPanel, selectedKey]);

  // Maps `resolveRailActivation`'s decision onto state/refs; returns whether
  // the click should navigate.
  const activateRail = (node: SidebarRailNode): boolean => {
    const action = resolveRailActivation(node, {
      selectedKey,
      state,
    });
    if (action.select) selectRail(node.key);
    if (action.focusPanel) focusPendingRef.current = true;
    if (action.toggle) toggleSidebar();
    return action.navigate;
  };

  // Same column in both shells; only desktop collapses to icons (the drawer
  // always shows labels, so its tooltips stay disabled).
  const railColumn = (collapsed: boolean) => {
    const renderRailItem = (node: SidebarRailNode) => (
      <RailItemLink
        key={node.key}
        node={node}
        selected={selectedKey === node.key}
        matched={matchedKey === node.key}
        onActivate={() => activateRail(node)}
        collapsed={collapsed}
        className={classNames.railItem}
      />
    );

    return (
      <div className={classNames.railColumn}>
        <nav
          ref={railNavRef}
          aria-label={ariaLabel || stringFormatter.format('railNavigation')}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
          onKeyDown={onRailKeyDown}
        >
          <div className={classNames.rail}>
            {nodes.filter(node => !node.inFooter).map(renderRailItem)}
          </div>
          {/* Pinned below the list: footer rail items plus any raw footer content. */}
          {footerNodes.length > 0 || footer ? (
            <div className={classNames.railFooter}>
              {footerNodes.map(renderRailItem)}
              {footer}
            </div>
          ) : null}
        </nav>
      </div>
    );
  };

  const panelBody =
    selectedNode?.isSection && selectedNode.nav ? (
      <>
        <h2 ref={titleRef} tabIndex={-1} className={classNames.panelTitle}>
          {selectedNode.panelTitle}
        </h2>
        {cloneElement(selectedNode.nav, {
          current,
          // Keep the panel landmark name in sync with the visible heading:
          // fall back to the section title when the nav has no `aria-label`.
          'aria-label': selectedNode.panelTitle,
        })}
      </>
    ) : null;

  // Mobile: the rail renders as the same full-width drawer as the single-column
  // sidebar — one nav column, brand header, close button. Sections become
  // drill-in branches (their `Sidebar.Nav` children are spliced in as the
  // pushed level, so the drawer opens pre-drilled into the active section);
  // direct links and pinned footer items become plain rows. Leaf taps close
  // the drawer, branch taps and the back button keep it open — all inherited
  // from `SidebarNav`, so the two sidebar variants stay pixel-identical here.
  if (isMobile) {
    // Explicit ids keep drill-down state stable across renders (auto-ids are
    // position-based); the `rail:` prefix avoids collisions with ids inside
    // the section navs.
    const renderMobileItem = (node: SidebarRailNode) =>
      node.isSection && node.nav ? (
        <SidebarItem
          key={node.key}
          id={`rail:${node.key}`}
          textValue={node.panelTitle ?? node.textValue}
          onPress={node.onPress}
        >
          {node.textValue}
          {/* Splice the nav's children (not the element) so they become the
              branch's drilled-in level instead of a nested landmark. */}
          {node.nav.props.children}
        </SidebarItem>
      ) : (
        <SidebarItem
          key={node.key}
          id={`rail:${node.key}`}
          href={node.href}
          onPress={node.onPress}
        >
          {node.textValue}
        </SidebarItem>
      );

    return (
      <SidebarModal ref={ref}>
        {header}
        <SidebarNav
          current={current}
          aria-label={ariaLabel || stringFormatter.format('railNavigation')}
        >
          {nodes.filter(node => !node.inFooter).map(renderMobileItem)}
          {footerNodes.length > 0 ? <SidebarSeparator /> : null}
          {footerNodes.map(renderMobileItem)}
        </SidebarNav>
        {footer}
      </SidebarModal>
    );
  }

  return (
    <aside
      ref={ref}
      aria-label={stringFormatter.format('sidebar')}
      // AppShell's `:has()` grid switches to header-first on this attribute.
      data-rail=""
      data-state={state}
      className={cn(
        // The full-width top bar sits above the rail, so the aside starts below
        // it and sticks to that offset. --ui-viewport-height lets a bounded
        // container (docs demos, embedded shells) stand in for the viewport.
        'top-topbar sticky h-[calc(var(--ui-viewport-height,100dvh)-var(--spacing-topbar))] self-start [grid-area:sidebar]',
        classNames.railRoot
      )}
    >
      <div
        data-state={state}
        data-panel={hasPanel ? 'expanded' : 'collapsed'}
        // Column widths + transition come from railLayout (--rail-w/--panel-w).
        className={cn(
          'grid h-full grid-cols-[var(--rail-w)_var(--panel-w)]',
          classNames.railLayout
        )}
      >
        {/* The toggle lives in the top bar (Sidebar.Toggle in
            TopNavigation.Start), not here. */}
        {railColumn(state === 'collapsed')}

        <div inert={!hasPanel || undefined} className={classNames.panel}>
          {panelBody}
        </div>
      </div>
    </aside>
  );
};

// Brand for rail-mode detection — reference identity breaks across HOC wrappers
// and duplicate package installs.
SidebarRail.__SIDEBAR_RAIL__ = true as const;

export { SidebarRail };
