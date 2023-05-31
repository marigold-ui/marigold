import React from 'react';
import { useTabList } from '@react-aria/tabs';
import { GapSpaceProp, cn, useClassNames, gapSpace } from '@marigold/system';
import { useTabListState } from '@react-stately/tabs';
import { useRef } from 'react';
import { AriaTabListProps } from '@react-types/tabs';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { Item } from '@react-stately/collections';
import { TabContext } from './Context';

interface TabsProps
  extends Omit<AriaTabListProps<object>, 'orientation' | 'isDisabled'>,
    GapSpaceProp {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  variant?: string;
}
export const Tabs = ({
  space = 2,
  size = 'medium',
  disabled,
  variant,
  ...rest
}: TabsProps) => {
  const ref = useRef(null);
  const props: AriaTabListProps<object> = {
    isDisabled: disabled,
    ...rest,
  };
  const state = useTabListState(props);
  const { tabListProps } = useTabList(props, state, ref);

  // We don't have variant for now , it is only for future use
  const classNames = useClassNames({
    component: 'Tabs',
    size,
    variant,
  });

  return (
    <TabContext.Provider value={{ classNames }}>
      <div
        className={cn('flex', gapSpace[space], classNames.tabs)}
        {...tabListProps}
        ref={ref}
      >
        {[...state.collection].map(item => {
          return <Tab key={item.key} item={item} state={state} />;
        })}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </TabContext.Provider>
  );
};

Tabs.Item = Item;
