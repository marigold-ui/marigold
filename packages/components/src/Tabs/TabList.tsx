import { LayoutGroup } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useId, useRef } from 'react';
import type RAC from 'react-aria-components';
import { TabList } from 'react-aria-components/Tabs';
import { MotionFeatures } from '../lazyMotion';
import { useTabContext } from './Context';

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

  // Translate a vertical mouse wheel into horizontal scroll so pointer users
  // without a trackpad can reach overflowing tabs. We only hijack the wheel
  // when the row actually overflows and the gesture is primarily vertical, so
  // a trackpad's native horizontal scroll and normal page scrolling are left
  // untouched. Attached natively (not via React's passive onWheel) so
  // preventDefault works.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const onWheel = (event: WheelEvent) => {
      // Let the browser zoom: ctrl/⌘+wheel (and trackpad pinch, which the
      // browser reports as ctrl+wheel) must not be hijacked into scroll.
      if (event.ctrlKey || event.metaKey) {
        return;
      }
      if (el.scrollWidth <= el.clientWidth) {
        return;
      }
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        return;
      }
      event.preventDefault();
      // Wheel deltas are not always pixels: Firefox can report line units
      // (deltaMode 1) for a physical mouse, where deltaY is a small line count.
      // Normalize so one wheel notch scrolls a sensible distance everywhere.
      const LINE_HEIGHT = 16;
      const delta =
        event.deltaMode === 1 ? event.deltaY * LINE_HEIGHT : event.deltaY;
      el.scrollBy({ left: delta, behavior: 'auto' });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

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
        >
          <TabList {...props} className={classNames.tabsList}>
            {props.children}
          </TabList>
        </m.div>
      </LayoutGroup>
    </MotionFeatures>
  );
};

export { _TabList as TabList };
