import { useRef } from 'react';
import type RAC from 'react-aria-components';
import { TabList as RACTabList } from 'react-aria-components/Tabs';
import { cn } from '@marigold/system';
import { useDevWarning } from '../utils/useDevWarning';
import { useWheelScrollX } from '../utils/useWheelScrollX';
import { useTabContext } from './Context';

// Props
// ----------------------
export type TabListProps = Omit<
  RAC.TabListProps<object>,
  'className' | 'style'
>;

// Component
// ----------------------
const TabList = (props: TabListProps) => {
  const { classNames } = useTabContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  // The `tabsListScroll` slot is required by the theme type, but a JS theme, an
  // `as Theme` cast, or a not-yet-migrated theme can still reach runtime without
  // it. Without the slot this wrapper gets no `overflow-x`/`snap-x`, so the row
  // blows the page wide instead of scrolling. Fail loudly in dev rather than
  // silently, keeping the strict contract without masking it with a fallback.
  useDevWarning(
    !classNames.tabsListScroll,
    '[Tabs] The theme is missing the required `tabsListScroll` slot, so the ' +
      'tab row will overflow the page instead of scrolling. Add a ' +
      '`tabsListScroll` entry to your `Tabs` theme (see theme-rui for a reference).'
  );

  useWheelScrollX(scrollRef);

  return (
    <div ref={scrollRef} className={classNames.tabsListScroll}>
      <RACTabList {...props} className={cn('flex', classNames.tabsList)}>
        {props.children}
      </RACTabList>
    </div>
  );
};

export { TabList };
