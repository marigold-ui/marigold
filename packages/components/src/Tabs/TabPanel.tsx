import React from 'react';
import { useRef } from 'react';
import { AriaTabPanelProps, useTabPanel } from '@react-aria/tabs';
import { Box } from '@marigold/system';
import { useTabContext } from './Context';
import { TabListState } from '@react-stately/tabs';

export interface TabPanelProps extends AriaTabPanelProps {
  state: TabListState<object>;
}

export const TabPanel = ({ state, ...props }: TabPanelProps) => {
  const ref = useRef(null);
  const { styles } = useTabContext();
  const { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <Box css={styles.tabPanel} {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </Box>
  );
};
