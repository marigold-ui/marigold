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
  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
};
