import React from 'react';
import { useRef } from 'react';
import { AriaTabPanelProps, useTabPanel } from '@react-aria/tabs';
import { TabListState } from '@react-stately/tabs';

export interface TabPanelProps extends AriaTabPanelProps {
  state: TabListState<object>;
  className?: string;
}

export const TabPanel = ({ state, className, ...props }: TabPanelProps) => {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div className={className} ref={ref} {...tabPanelProps}>
      {state.selectedItem?.props.children}
    </div>
  );
};
