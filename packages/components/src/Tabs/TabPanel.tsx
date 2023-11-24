import { TabPanel } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useTabContext } from './Context';

// props
// ----------------------
export interface TabPanelProps
  extends Omit<RAC.TabPanelProps, 'className' | 'style'> {}

// component
// ----------------------
const _TabPanel = (props: TabPanelProps) => {
  const { classNames } = useTabContext();
  return (
    <TabPanel {...props} className={classNames.tabpanel}>
      {props.children}
    </TabPanel>
  );
};

export { _TabPanel as TabPanel };
