import { useLayoutEffect, useState } from 'react';

export interface OverflowRegionItemProps {
  className: string;
  inert?: boolean;
  'aria-hidden'?: boolean;
  'data-overflow-item'?: boolean;
  'data-overflow-indicator'?: boolean;
}

const VISIBLE = 'shrink-0';
// Demoted items leave the flex flow (`absolute`) so the indicator sits right
// after the last visible item, but keep their box (never `display: none`) so
// their natural width stays measurable in place. `invisible` takes them out
// of paint and the tab order, and `opacity-0` backs it up: a child can turn
// `visibility` back on for itself and reappear (react-aria date segments do),
// but opacity applies to the whole subtree and cannot be overridden.
const HIDDEN = 'shrink-0 invisible opacity-0 absolute';

/**
 * Measures how many of a row's items fit into the available width, so the
 * rest can be hidden instead of wrapping.
 *
 * The items stay mounted inside a clipped (`overflow-clip`) region and are
 * measured in place: nothing is `display: none`, so `getBoundingClientRect`
 * always reports real widths and no hidden measurement clone or transient
 * "show all" render pass is needed. Items that do not fit are hidden with
 * `visibility`, `opacity` and `inert`, which removes them from paint, tab
 * order, and the accessibility tree while keeping them measurable. Because the
 * region
 * owns its width (`flex-1`) and hiding items does not change it, the resize
 * observer cannot re-trigger itself.
 *
 * When an indicator is present, its width is reserved as soon as at least
 * one item is demoted, so the indicator never causes a second demotion
 * round trip. It stays mounted (hidden the same way as demoted items) so
 * its width is known before it is needed.
 *
 * Server markup renders all items; they are clipped by the region until the
 * first client-side measurement (pre-paint, in a layout effect) settles the
 * visible count.
 */
export const useOverflowRegion = (itemCount: number, itemsKey?: string) => {
  // The region node lives in state (set by the ref callback below) so the
  // layout effect can depend on it directly, instead of reaching into a
  // plain ref from a second, separately triggered effect.
  const [region, setRegion] = useState<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  // (Re-)observe the region and its items whenever the node mounts or the
  // set of children changes. `itemsKey` is a signature of the children's
  // keys, so replacing items with new keys (even at the same count) re-runs
  // this effect and re-attaches the observer to the fresh wrapper nodes --
  // otherwise the observer would keep watching the old, detached ones. Runs
  // before paint so the initial all-visible server markup is corrected
  // without a flash.
  //
  // Items are observed too, not just the region, to catch an item changing
  // its own size, e.g. a select growing with a longer value -- the
  // region's width stays constant in that case, so a region-only observer
  // would miss it.
  useLayoutEffect(() => {
    if (!region) return;

    const calculate = () => {
      const regionStyle = getComputedStyle(region);
      // Content-box width: the padding is only clip-edge slack (see the
      // region's className), not space that items may occupy.
      const available =
        region.clientWidth -
        (parseFloat(regionStyle.paddingLeft) || 0) -
        (parseFloat(regionStyle.paddingRight) || 0);
      const gap = parseFloat(regionStyle.gap) || 0;
      const width = (element: Element) => element.getBoundingClientRect().width;

      const items = Array.from(
        region.querySelectorAll(':scope > [data-overflow-item]')
      );
      const indicator = region.querySelector(
        ':scope > [data-overflow-indicator]'
      );

      // Half-pixel tolerance so subpixel rounding does not demote an item
      // that visually fits.
      const fits = (used: number) => used <= available + 0.5;

      const total = items.reduce(
        (sum, item, index) => sum + width(item) + (index > 0 ? gap : 0),
        0
      );
      if (fits(total)) {
        setVisibleCount(items.length);
        return;
      }

      // Not everything fits: reserve room for the indicator, then fit items
      // front to back -- the tail demotes first.
      const reserved = indicator ? width(indicator) + gap : 0;
      let used = 0;
      let count = 0;
      for (const item of items) {
        used += width(item) + (count > 0 ? gap : 0);
        if (!fits(used + reserved)) break;
        count++;
      }
      setVisibleCount(count);
    };

    const observer = new ResizeObserver(calculate);
    observer.observe(region);
    for (const child of region.children) {
      observer.observe(child);
    }
    return () => observer.disconnect();
  }, [region, itemCount, itemsKey]);

  const hidden = {
    className: HIDDEN,
    inert: true,
    'aria-hidden': true,
  } as const;

  return {
    regionProps: {
      ref: setRegion,
      // `relative` anchors the absolutely positioned (demoted) items. Only
      // the x-axis is clipped so focus rings and border anti-aliasing stay
      // intact vertically; the negative margin + padding pair moves the
      // horizontal clip edge slightly outside the items (without changing
      // the region's footprint) for the same reason. The measurement
      // subtracts the padding, so items never occupy the slack.
      className:
        'relative -mx-1 flex min-w-0 flex-1 flex-nowrap overflow-x-clip px-1',
    },
    getItemProps: (index: number): OverflowRegionItemProps => ({
      'data-overflow-item': true,
      ...(index < visibleCount ? { className: VISIBLE } : hidden),
    }),
    getIndicatorProps: (): OverflowRegionItemProps => ({
      'data-overflow-indicator': true,
      ...(visibleCount < itemCount ? { className: VISIBLE } : hidden),
    }),
    visibleCount: Math.min(visibleCount, itemCount),
  };
};
