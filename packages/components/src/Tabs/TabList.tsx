import { LayoutGroup } from 'motion/react';
import { useId } from 'react';
import type RAC from 'react-aria-components';
import { TabList } from 'react-aria-components';
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
