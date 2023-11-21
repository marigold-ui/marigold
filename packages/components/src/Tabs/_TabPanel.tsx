import { useRef } from 'react';

import { AriaTabPanelProps, useTabPanel } from '@react-aria/tabs';

import { TabListState } from '@react-stately/tabs';

import { cn } from '@marigold/system';

import { useTabContext } from './Context';

export interface TabPanelProps extends AriaTabPanelProps {
  state: TabListState<object>;
}

export const TabPanel = ({ state, ...props }: TabPanelProps) => {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  const selectedItemProps = state.selectedItem?.props;
  const { classNames } = useTabContext();

  return (
    <div className={cn(classNames.tabpanel)} ref={ref} {...tabPanelProps}>
      {selectedItemProps?.children}
    </div>
  );
};
