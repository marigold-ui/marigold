import type RAC from 'react-aria-components';
import { Tabs as RACTabs } from 'react-aria-components/Tabs';
import { useClassNames } from '@marigold/system';
import { TabContext } from './Context';
import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';

// Props
// ----------------------
export interface TabsProps extends Omit<
  RAC.TabsProps,
  'className' | 'style' | 'isDisabled' | 'orientation' | 'slot'
> {
  /**
   * Set All TabPanel disabled
   * @default false
   */
  disabled?: boolean;
  size?: string;
  variant?: string;
}

// Component
// ----------------------
const Tabs = ({ disabled, variant, size, ...rest }: TabsProps) => {
  const props: RAC.TabsProps = {
    isDisabled: disabled,
    ...rest,
  };
  const classNames = useClassNames({
    component: 'Tabs',
    size,
    variant,
  });
  return (
    <TabContext value={{ classNames }}>
      <RACTabs {...props} className={classNames.container}>
        {props.children}
      </RACTabs>
    </TabContext>
  );
};

Tabs.List = TabList;
Tabs.Panel = TabPanel;
Tabs.Item = Tab;

export { Tabs };
