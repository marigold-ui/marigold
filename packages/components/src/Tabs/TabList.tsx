import { TabList } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { GapSpaceProp, cn, gapSpace } from '@marigold/system';
import { useTabContext } from './Context';

// props
// ----------------------
export interface TabListProps
  extends Omit<RAC.TabListProps<Object>, 'className' | 'style'>,
    GapSpaceProp {}

// component
// ----------------------
const _TabList = ({ space = 2, ...props }: TabListProps) => {
  const { classNames } = useTabContext();
  return (
    <TabList
      {...props}
      className={cn('flex', gapSpace[space], classNames.tabsList)}
    >
      {props.children}
    </TabList>
  );
};

export { _TabList as TabList };
