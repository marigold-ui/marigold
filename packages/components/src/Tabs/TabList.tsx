import type RAC from 'react-aria-components';
import { LayoutGroup } from 'motion/react';
import { TabList } from 'react-aria-components';
import { useId } from 'react';
import { cn } from '@marigold/system';
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
  return (
    <LayoutGroup id={layoutId}>
      <TabList {...props} className={cn('flex', classNames.tabsList)}>
        {props.children}
      </TabList>
    </LayoutGroup>
  );
};

export { _TabList as TabList };
