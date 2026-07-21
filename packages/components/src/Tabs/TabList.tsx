import { LayoutGroup } from 'motion/react';
import * as m from 'motion/react-m';
import { useId, useRef } from 'react';
import type RAC from 'react-aria-components';
import { TabList } from 'react-aria-components/Tabs';
import { cn } from '@marigold/system';
import { MotionFeatures } from '../lazyMotion';
import { useWheelScrollX } from '../utils/useWheelScrollX';
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

  useWheelScrollX(scrollRef);

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
          <TabList {...props} className={cn('flex', classNames.tabsList)}>
            {props.children}
          </TabList>
        </m.div>
      </LayoutGroup>
    </MotionFeatures>
  );
};

export { _TabList as TabList };
