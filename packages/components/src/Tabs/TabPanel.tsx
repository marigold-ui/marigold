import type RAC from 'react-aria-components';
import { TabPanel } from 'react-aria-components/Tabs';
import { useTabContext } from './Context';

// Props
// ----------------------
export type TabPanelProps = Omit<RAC.TabPanelProps, 'className' | 'style'>;

// Component
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
