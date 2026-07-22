import type { ReactNode } from 'react';
import { Children, isValidElement, useLayoutEffect, useRef } from 'react';
import type { SpaceProp, SpacingTokens } from '@marigold/system';
import { cn, createSpacingVar } from '@marigold/system';
import { useOverflowRegion } from './useOverflowRegion';

// Props
// ---------------
export interface OverflowRegionState {
  /** Total number of items in the region. */
  count: number;
  /** Number of items that currently fit. */
  visibleCount: number;
  /** Number of items that are currently hidden. */
  hiddenCount: number;
}

export interface OverflowRegionProps {
  /**
   * Space between the items. Defaults to the spacing of a parent layout
   * component (e.g. `<Inline space="…">`), inherited through the `--space`
   * custom property, and falls back to the `related` token when the region
   * has no such parent. Set it explicitly to override.
   */
  space?: SpaceProp<SpacingTokens>['space'];

  /**
   * The items, in priority order: the trailing items are hidden first when
   * the region runs out of horizontal space. Hidden items are made inert
   * and removed from the accessibility tree, so every item must stay
   * reachable through another surface — a panel, menu, or the `indicator`.
   */
  children: ReactNode;

  /**
   * Rendered after the last visible item while at least one item is
   * hidden. Use it to keep hidden items discoverable, e.g. a "More" menu
   * or a trigger for the surface that holds the full set.
   */
  indicator?: ReactNode | ((state: OverflowRegionState) => ReactNode);

  /**
   * Called whenever the number of visible items changes. Use this when the
   * recovery surface lives outside the region, e.g. to badge a pinned
   * trigger with the hidden count.
   */
  onOverflowChange?: (state: OverflowRegionState) => void;
}

// Component
// ---------------

/**
 * A single-row region that hides its trailing items instead of wrapping
 * when horizontal space runs out, and restores them as space returns.
 *
 * Place it inside any non-wrapping flex row (e.g. `<Inline noWrap>`): it
 * takes up the remaining space between its pinned siblings and clips its
 * content. Items stay mounted when hidden — they keep their state and are
 * hidden from paint, tab order, and assistive technology.
 *
 * Hiding is not a recovery strategy by itself: pair the region with an
 * `indicator` or an external surface (via `onOverflowChange`) so hidden
 * items remain reachable.
 */
export const OverflowRegion = ({
  space,
  children,
  indicator,
  onOverflowChange,
}: OverflowRegionProps) => {
  const items = Children.toArray(children);
  const { regionProps, getItemProps, getIndicatorProps, visibleCount } =
    useOverflowRegion(items.length);
  const { className: indicatorClassName, ...indicatorProps } =
    getIndicatorProps();

  const state: OverflowRegionState = {
    count: items.length,
    visibleCount,
    hiddenCount: items.length - visibleCount,
  };

  // Notify subscribers after paint, only when the visible count settles on
  // a new value.
  const previousVisibleRef = useRef(visibleCount);
  useLayoutEffect(() => {
    if (previousVisibleRef.current === visibleCount) return;
    previousVisibleRef.current = visibleCount;
    onOverflowChange?.(state);
  });

  return (
    <div
      {...regionProps}
      className={cn(
        regionProps.className,
        // Inherit the row gap from a parent layout component (Inline, Stack,
        // ...) that set `--space`; fall back to the `related` token when the
        // region stands alone. An explicit `space` prop sets `--space` below
        // and wins over both.
        'gap-[var(--space,var(--spacing-related))]'
      )}
      style={space != null ? createSpacingVar('space', `${space}`) : undefined}
    >
      {items.map((item, index) => {
        const { className, ...itemProps } = getItemProps(index);
        // Children.toArray assigns stable keys to elements; fall back to
        // the index for non-element children (e.g. plain strings), which
        // have none.
        const key = isValidElement(item) ? (item.key ?? index) : index;
        return (
          <div key={key} {...itemProps} className={className}>
            {item}
          </div>
        );
      })}
      {indicator != null && (
        <div {...indicatorProps} className={indicatorClassName}>
          {typeof indicator === 'function' ? indicator(state) : indicator}
        </div>
      )}
    </div>
  );
};
