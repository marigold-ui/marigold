import { LayoutGroup } from 'motion/react';
import * as m from 'motion/react-m';
import { useId, useRef } from 'react';
import type RAC from 'react-aria-components';
import { TabList } from 'react-aria-components/Tabs';
import { useEvent } from '@react-aria/utils';
import { cn } from '@marigold/system';
import { MotionFeatures } from '../lazyMotion';
import { useTabContext } from './Context';

// Module constant so its identity stays stable across renders: `useEvent`
// lists `options` in its effect deps, so an inline object would re-subscribe
// the listener every render. `passive: false` is required for preventDefault.
const WHEEL_OPTS = { passive: false } as const;

// Firefox can report wheel deltas in line units (deltaMode 1) for a physical
// mouse, where deltaY is a small line count. Normalize so one wheel notch
// scrolls a sensible distance everywhere.
const LINE_HEIGHT = 16;

// props
// ----------------------
export type TabListProps = Omit<
  RAC.TabListProps<object>,
  'className' | 'style'
>;

// component
// ----------------------
const _TabList = (props: TabListProps) => {
  const { classNames } = useTabContext();
  const layoutId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);

  // The `tabsListScroll` slot is required by the theme type, but a JS theme, an
  // `as Theme` cast, or a not-yet-migrated theme can still reach runtime without
  // it. Without the slot this wrapper gets no `overflow-x`/`snap-x`, so the row
  // blows the page wide instead of scrolling. Fail loudly in dev rather than
  // silently, keeping the strict contract without masking it with a fallback.
  if (process.env.NODE_ENV !== 'production' && !classNames.tabsListScroll) {
    console.warn(
      '[Tabs] The theme is missing the required `tabsListScroll` slot, so the ' +
        'tab row will overflow the page instead of scrolling. Add a ' +
        '`tabsListScroll` entry to your `Tabs` theme (see theme-rui for a reference).'
    );
  }

  // Translate a vertical mouse wheel into horizontal scroll so pointer users
  // without a trackpad can reach overflowing tabs. We only hijack the wheel
  // when the row actually overflows and the gesture is primarily vertical, so
  // a trackpad's native horizontal scroll and normal page scrolling are left
  // untouched. `useEvent` attaches natively (not via React's passive onWheel)
  // so preventDefault works, and keeps the handler current without re-subscribing.
  useEvent(
    scrollRef,
    'wheel',
    event => {
      const el = scrollRef.current;
      if (!el) {
        return;
      }
      // Let the browser zoom: ctrl+wheel (and trackpad pinch, which the browser
      // reports as ctrl+wheel) must not be hijacked into scroll. Zoom is
      // ctrlKey-only, so metaKey is deliberately not guarded here.
      if (event.ctrlKey) {
        return;
      }
      if (el.scrollWidth <= el.clientWidth) {
        return;
      }
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        return;
      }
      const delta =
        event.deltaMode === 1 ? event.deltaY * LINE_HEIGHT : event.deltaY;
      // Don't trap the wheel at the ends: when there's no room left in the
      // wheel's direction, let the event bubble so the page can scroll past the
      // tab bar instead of swallowing the gesture.
      const max = el.scrollWidth - el.clientWidth;
      if (
        (delta < 0 && el.scrollLeft <= 0) ||
        (delta > 0 && el.scrollLeft >= max)
      ) {
        return;
      }
      event.preventDefault();
      // `behavior: 'instant'` tracks the wheel 1:1. The default `'auto'` defers
      // to the element's CSS `scroll-behavior: smooth`, which starts a fresh
      // animation per notch that snapping keeps interrupting, so rapid notches
      // don't compose and the row scrolls erratically. Smooth scroll is still
      // used for react-aria's programmatic scroll-into-view.
      el.scrollBy({ left: delta, behavior: 'instant' });
    },
    WHEEL_OPTS
  );

  return (
    <MotionFeatures>
      <LayoutGroup id={layoutId}>
        {/*
         * `layoutScroll` keeps the motion indicator (`layoutId`) correct when an
         * off-screen tab is scrolled into view, otherwise it projects against a
         * stale scroll offset.
         */}
        <m.div
          ref={scrollRef}
          layoutScroll
          className={classNames.tabsListScroll}
          data-testid="tabs-list-scroll"
        >
          <TabList {...props} className={cn('flex', classNames.tabsList)}>
            {props.children}
          </TabList>
        </m.div>
      </LayoutGroup>
    </MotionFeatures>
  );
};

export { _TabList as TabList };
