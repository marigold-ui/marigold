import React from 'react';
import { useRef } from 'react';

import { useTabList } from '@react-aria/tabs';

import { Item } from '@react-stately/collections';
import { useTabListState } from '@react-stately/tabs';

import { AriaTabListProps } from '@react-types/tabs';

import { GapSpaceProp, cn, gapSpace, useClassNames } from '@marigold/system';

import { TabContext } from './Context';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';

//props
// ----------------------
interface TabsProps
  extends Omit<AriaTabListProps<object>, 'orientation' | 'isDisabled'>,
    GapSpaceProp {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  variant?: string;
}

// component
// ----------------------
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
      {/* tabs container */}
      <div className={cn(classNames.container)}>
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
      </div>
    </TabContext.Provider>
  );
};

Tabs.Item = Item;
