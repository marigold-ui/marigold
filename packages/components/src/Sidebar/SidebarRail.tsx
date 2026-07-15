import { cloneElement, useLayoutEffect, useRef } from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import { Focusable } from 'react-aria-components/Focusable';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { isFocusVisible } from '@react-aria/interactions';
import {
  handleLinkClick,
  useLinkProps,
  useObjectRef,
  useRouter,
} from '@react-aria/utils';
import { cn } from '@marigold/system';
import { Tooltip } from '../Tooltip/Tooltip';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarModal } from './SidebarModal';
import type { SidebarNavProps } from './SidebarNav';
import type { SidebarCurrent } from './collection';
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
  const ref = useObjectRef<HTMLAnchorElement>();
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
          ref={ref}
          href={node.href}
          role={node.href ? undefined : 'button'}
          aria-current={ariaCurrent}
          data-active={selected || undefined}
          className={className}
          onClick={e => {
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
  const activateRail = (node: SidebarRailNode): boolean => {
    if (!node.isSection) {
      selectRail(node.key);
      // Mobile: the link leaves the page, so the drawer leaves with it.
      if (isMobile) toggleSidebar();
      return true;
    }
    if (isMobile) {
      // The drawer shows rail and panel side by side, so a section tap only
      // retargets the panel — navigating would close the drawer before the
      // user picks a leaf. Re-tapping the active section is a no-op (there
      // is no hidden panel to toggle).
      if (node.key !== selectedKey) {
        selectRail(node.key);
        focusPendingRef.current = true;
      }
      return false;
    }
    if (node.key === selectedKey) {
      // Re-click the active section: toggle the panel (VS Code model).
      if (state === 'collapsed') focusPendingRef.current = true; // expanding
      toggleSidebar();
      return false;
    }
    // Switch section: swap the panel, ensure it is open, move focus to it.
    selectRail(node.key);
    if (state === 'collapsed') toggleSidebar();
    focusPendingRef.current = true;
    return true;
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
        {cloneElement(selectedNode.nav as ReactElement<SidebarNavProps>, {
          current,
        })}
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
          // this ancestor state for their label row.
          data-state="expanded"
          className="grid h-full min-h-0 grid-cols-[6.5rem_1fr] [grid-area:content]"
        >
          {railColumn(false)}
          <div
            className={cn(
              '[&>nav]:min-h-0 [&>nav]:flex-1',
              classNames.panel,
              // The drawer's edge is the boundary here — the desktop panel
              // divider would double it.
              'border-r-0'
            )}
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
      data-state={state}
      className={cn(
        // The full-width top bar spans above the rail (AppShell's header-first
        // grid), so the aside starts below it and sticks to that offset.
        'sticky top-14 h-[calc(100dvh-3.5rem)] self-start [grid-area:sidebar]',
        classNames.railRoot
      )}
    >
      <div
        data-state={state}
        data-panel={hasPanel ? 'expanded' : 'collapsed'}
        className={cn(
          'grid h-full',
          // Two independent axes. Rail column: full width (icon + label) when
          // expanded, an icon-only strip when collapsed — reclaiming space for
          // the page. Panel column: only has width while a section panel is
          // showing (a direct-link page has none, in either state).
          '[--rail-w:6.5rem] data-[state=collapsed]:[--rail-w:4rem]',
          '[--panel-w:15.5rem] data-[panel=collapsed]:[--panel-w:0rem]',
          'grid-cols-[var(--rail-w)_var(--panel-w)]',
          'transition-[grid-template-columns] duration-200 ease-in-out',
          'motion-reduce:transition-none'
        )}
      >
        {/* Rail column: draws the always-on divider between the rail and
            everything to its right, starting under the top bar. The toggle
            lives in the top bar (Sidebar.Toggle in TopNavigation.Start), not
            here. */}
        {railColumn(state === 'collapsed')}

        <div
          inert={!hasPanel || undefined}
          className={cn('[&>nav]:min-h-0 [&>nav]:flex-1', classNames.panel)}
        >
          {panelBody}
        </div>
      </div>
    </aside>
  );
};

// Brand so `Sidebar` can detect a two-level rail among its children and delegate.
SidebarRail.__SIDEBAR_RAIL__ = true as const;

export { SidebarRail };
