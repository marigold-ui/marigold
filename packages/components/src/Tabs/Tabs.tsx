import React from 'react';
import { useTabList } from '@react-aria/tabs';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { useTabListState } from '@react-stately/tabs';
import { useRef } from 'react';
import { AriaTabListProps } from '@react-types/tabs';

import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabContext } from './Context';
import { Item } from '@react-stately/collections';

export interface TabsThemeExtension
  extends ThemeExtensionsWithParts<'Tabs', ['tabs', 'tab', 'tabPanel']> {}
interface TabsProps
  extends Omit<AriaTabListProps<object>, 'orientation' | 'isDisabled'> {
  gap?: number;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}
export const Tabs = ({
  gap = 1,
  size = 'medium',
  disabled,
  ...res
}: TabsProps) => {
  const ref = useRef(null);
  const props: AriaTabListProps<object> = {
    isDisabled: disabled,
    ...res,
  };
  const state = useTabListState(props);
  const { tabListProps } = useTabList(props, state, ref);
  const styles = useComponentStyles(
    'Tabs',
    { size },
    { parts: ['tabs', 'tab', 'tabPanel'] }
  );
  return (
    <TabContext.Provider value={{ styles }}>
      <div>
        <Box
          css={styles.tabs}
          __baseCSS={{ display: 'flex', gap: `${gap}rem` }}
          {...tabListProps}
          ref={ref}
        >
          {[...state.collection].map(item => {
            return <Tab key={item.key} item={item} state={state} />;
          })}
        </Box>
        <TabPanel key={state.selectedItem?.key} state={state} />
      </div>
    </TabContext.Provider>
  );
};

Tabs.Item = Item;
