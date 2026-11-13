import type RAC from 'react-aria-components';
import { TabPanel as RACTabPanel } from 'react-aria-components/Tabs';
import { useTabContext } from './Context';

// Props
// ----------------------
export type TabPanelProps = Omit<RAC.TabPanelProps, 'className' | 'style'>;

// Component
// ----------------------
const TabPanel = (props: TabPanelProps) => {
  const { classNames } = useTabContext();
  return (
    <RACTabPanel {...props} className={classNames.tabpanel}>
      {props.children}
    </RACTabPanel>
  );
};

export { TabPanel };
