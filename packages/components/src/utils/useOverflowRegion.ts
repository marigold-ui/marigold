import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export interface OverflowRegionItemProps {
  className: string;
  inert?: boolean;
  'aria-hidden'?: boolean;
}

export interface OverflowRegion {
  /**
   * Props for the clipped region element. The region is the flexible middle
   * of a non-wrapping row; pinned controls render outside it as regular
   * siblings and are never measured or hidden.
   */
  regionProps: {
    ref: (node: HTMLDivElement | null) => void;
    className: string;
  };
  /**
   * Props for the item wrapper at the given index. Items must be direct
   * children of the region, rendered in priority order: the tail demotes
   * first when space runs out.
   */
  getItemProps: (index: number) => OverflowRegionItemProps;
  /** Number of items that currently fit into the region. */
  visibleCount: number;
}

/**
 * Measures how many of a row's items fit into the available width, so the
 * rest can be hidden instead of wrapping.
 *
 * The items stay mounted inside a clipped (`overflow-clip`) region and are
 * measured in place: nothing is `display: none`, so `getBoundingClientRect`
 * always reports real widths and no hidden measurement clone is needed.
 * Items that do not fit are hidden with `visibility` and `inert`, which
 * keeps their layout (and therefore their measurability) intact while
 * removing them from paint, tab order, and the accessibility tree. Because
 * the region owns its width (`flex-1`) and `visibility` does not affect
 * layout, hiding items never resizes the region, so the resize observer
 * cannot re-trigger itself.
 *
 * Server markup renders all items; they are clipped by the region until the
 * first client-side measurement (pre-paint, in a layout effect) settles the
 * visible count.
 */
export const useOverflowRegion = (itemCount: number): OverflowRegion => {
  const regionRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  const calculate = useCallback(() => {
    const region = regionRef.current;
    if (!region) return;

    const available = region.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(region).gap) || 0;

    let used = 0;
    let count = 0;
    for (const item of region.children) {
      used += item.getBoundingClientRect().width + (count > 0 ? gap : 0);
      // Half-pixel tolerance so subpixel rounding does not demote an item
      // that visually fits.
      if (used > available + 0.5) break;
      count++;
    }
    setVisibleCount(count);
  }, []);

  const observerRef = useRef<ResizeObserver | null>(null);

  // Callback ref instead of a ref object so observation starts as soon as
  // the region mounts. Observing the items as well (not just the region)
  // catches items changing their own size, e.g. a select growing with a
  // longer value — the region's width stays constant in that case, so a
  // region-only observer would miss it.
  const observe = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      regionRef.current = node;

      if (!node) return;
      const observer = new ResizeObserver(calculate);
      observer.observe(node);
      for (const item of node.children) {
        observer.observe(item);
      }
      observerRef.current = observer;
    },
    [calculate]
  );

  // Re-measure (and re-observe, since the children changed) when the item
  // count changes; runs before paint so the initial all-visible server
  // markup is corrected without a flash.
  useLayoutEffect(() => {
    const region = regionRef.current;
    if (region) observe(region);
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [itemCount, observe]);

  return {
    regionProps: {
      ref: observe,
      className: 'flex min-w-0 flex-1 flex-nowrap overflow-clip',
    },
    getItemProps: (index: number) =>
      index < visibleCount
        ? { className: 'shrink-0' }
        : {
            className: 'shrink-0 invisible',
            inert: true,
            'aria-hidden': true,
          },
    visibleCount: Math.min(visibleCount, itemCount),
  };
};
