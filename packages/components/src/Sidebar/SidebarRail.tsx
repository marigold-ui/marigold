import { cloneElement, useEffect, useLayoutEffect, useRef } from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { isFocusVisible } from '@react-aria/interactions';
import {
  handleLinkClick,
  useLinkProps,
  useObjectRef,
  useRouter,
} from '@react-aria/utils';
import { cn } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { useSidebar } from './Context';
import { SidebarModal } from './SidebarModal';
import { SidebarNav } from './SidebarNav';
import type { SidebarNavProps } from './SidebarNav';
import type { SidebarCurrent } from './collection';
import { railToNavChildren } from './railCollection';
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
  className,
}: RailItemLinkProps) => {
  const ref = useObjectRef<HTMLAnchorElement>();
  const router = useRouter();
  const routerLinkProps = useLinkProps({ href: node.href });

  // The leaf is the true current page (marked in the panel); a section rail item
  // is only its ancestor, so it announces `true`, not `page`. A direct-link rail
  // item that is itself the page announces `page`.
  const ariaCurrent = matched ? (node.isSection ? 'true' : 'page') : undefined;

  return (
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
  const { classNames, isMobile, state, toggleSidebar, setPanelAvailable } =
    useSidebar();
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

  // Tell Sidebar.Toggle / Cmd+B whether there is a panel to collapse: a
  // direct-link selection has no section panel, so the toggle goes inert.
  const sectionSelected = selectedNode?.isSection ?? false;
  useEffect(() => {
    setPanelAvailable(sectionSelected);
    return () => setPanelAvailable(true);
  }, [sectionSelected, setPanelAvailable]);

  const titleRef = useRef<HTMLHeadingElement>(null);
  // Set when a user rail action should move focus to the panel heading; the
  // effect below acts on it once the panel is shown. Route-driven or mount
  // selection never sets it, so focus is never stolen unprompted.
  const focusPendingRef = useRef(false);

  const hasPanel = (selectedNode?.isSection ?? false) && state === 'expanded';

  const footerNodes = nodes.filter(node => node.inFooter);

  useLayoutEffect(() => {
    if (!focusPendingRef.current || !hasPanel) return;
    focusPendingRef.current = false;
    titleRef.current?.focus({ focusVisible: isFocusVisible() } as FocusOptions);
  }, [hasPanel, selectedKey]);

  // Returns whether the click should navigate (false = re-click toggle only).
  const activateRail = (node: SidebarRailNode): boolean => {
    if (!node.isSection) {
      selectRail(node.key);
      return true;
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

  // Mobile: collapse to the single-column drawer with rail items as the root
  // level (sections drill in, opening on the active section).
  if (isMobile) {
    return (
      <SidebarModal ref={ref}>
        {header}
        <SidebarNav current={current}>{railToNavChildren(nodes)}</SidebarNav>
        {footer}
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
        data-panel={hasPanel ? 'expanded' : 'collapsed'}
        className={cn(
          'grid h-full',
          'grid-cols-[6.5rem_15.5rem] data-[panel=collapsed]:grid-cols-[6.5rem_0rem]',
          'transition-[grid-template-columns] duration-200 ease-in-out',
          'motion-reduce:transition-none'
        )}
      >
        {/* Rail column: its right border pairs with the top bar's toggle slot
            to draw the one top-to-bottom divider. The toggle itself lives in
            that slot (Sidebar.Toggle in TopNavigation.Start), not here. */}
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
                    className={classNames.railItem}
                  />
                ))}
                {footer}
              </div>
            ) : null}
          </nav>
        </div>

        <div
          inert={!hasPanel || undefined}
          className={cn('[&>nav]:min-h-0 [&>nav]:flex-1', classNames.panel)}
        >
          {selectedNode?.isSection && selectedNode.nav ? (
            <>
              <h2
                ref={titleRef}
                tabIndex={-1}
                className={classNames.panelTitle}
              >
                {selectedNode.panelTitle}
              </h2>
              {cloneElement(selectedNode.nav as ReactElement<SidebarNavProps>, {
                current,
              })}
            </>
          ) : null}
        </div>
      </div>
    </aside>
  );
};

// Brand so `Sidebar` can detect a two-level rail among its children and delegate.
SidebarRail.__SIDEBAR_RAIL__ = true as const;

export { SidebarRail };
