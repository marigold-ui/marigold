import { cloneElement, useEffect, useLayoutEffect, useRef } from 'react';
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
import { SidebarNav } from './SidebarNav';
import type { SidebarNavProps } from './SidebarNav';
import { SidebarToggle } from './SidebarToggle';
import type { SidebarCurrent } from './collection';
import { railToNavChildren } from './railCollection';
import type { SidebarRailNode } from './railCollection';
import { useSidebarRailState } from './useSidebarRailState';

export interface SidebarRailProps {
  /**
   * The rail contents: `Sidebar.Header` (brand), `Sidebar.RailItem`s, and
   * `Sidebar.Footer` (user/avatar). A `RailItem` wrapping a `Sidebar.Nav` is a
   * section (shows a panel); one with only an `href` is a direct link.
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
 * list, unlike the panel's roving tree). Icon-only — the label lives in a
 * tooltip to the right, so `aria-label` carries the accessible name.
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
    <Tooltip.Trigger delay={600}>
      <Focusable>
        <a
          {...routerLinkProps}
          ref={ref}
          href={node.href}
          role={node.href ? undefined : 'button'}
          aria-label={node.textValue}
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
        'sticky top-0 h-dvh self-start [grid-area:sidebar]',
        classNames.railRoot
      )}
    >
      <div
        data-panel={hasPanel ? 'expanded' : 'collapsed'}
        className={cn(
          'grid h-full grid-rows-[3.5rem_1fr]',
          "[grid-template-areas:'rail_brand'_'rail_panel']",
          'grid-cols-[3.5rem_15.5rem] data-[panel=collapsed]:grid-cols-[3.5rem_0rem]',
          'transition-[grid-template-columns] duration-200 ease-in-out',
          'motion-reduce:transition-none'
        )}
      >
        {/* Rail column: the toggle head pinned above the scrolling icon list,
            spanning both rows so its right border is the one top-to-bottom
            divider. */}
        <div className={cn('[grid-area:rail]', classNames.railColumn)}>
          <div className={classNames.railHead}>
            <SidebarToggle variant="rail" />
          </div>
          <nav
            aria-label={ariaLabel || stringFormatter.format('railNavigation')}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className={classNames.rail}>
              {nodes.map(node => (
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
            {footer ? (
              <div className={classNames.railFooter}>{footer}</div>
            ) : null}
          </nav>
        </div>

        {/* Brand band above the panel (empty when the wordmark lives in the top
            navigation instead). */}
        <div className={cn('[grid-area:brand]', classNames.brand)}>
          {header}
        </div>

        <div
          inert={!hasPanel || undefined}
          className={cn(
            '[grid-area:panel] [&>nav]:min-h-0 [&>nav]:flex-1',
            classNames.panel
          )}
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
