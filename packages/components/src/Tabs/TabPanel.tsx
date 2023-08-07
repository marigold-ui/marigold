import React from 'react';
import { useRef } from 'react';
import { AriaTabPanelProps, useTabPanel } from '@react-aria/tabs';
import { TabListState } from '@react-stately/tabs';

export interface TabPanelProps extends AriaTabPanelProps {
  state: TabListState<object>;
}

export const TabPanel = ({ state, ...props }: TabPanelProps) => {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  const selectedItemProps = state.selectedItem?.props;
  return (
    <div className={selectedItemProps?.className} ref={ref} {...tabPanelProps}>
      {selectedItemProps?.children}
    </div>
  );
};
