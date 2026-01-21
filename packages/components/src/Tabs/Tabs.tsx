import type RAC from 'react-aria-components';
import { Tabs } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { TabContext } from './Context';
import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';

// props
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
  size?: 'small' | 'medium' | 'large';
  variant?: string;
}

// component
// ----------------------
const _Tabs = ({ disabled, variant, size = 'medium', ...rest }: TabsProps) => {
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
    <TabContext.Provider value={{ classNames }}>
      <Tabs {...props} className={classNames.container}>
        {props.children}
      </Tabs>
    </TabContext.Provider>
  );
};

_Tabs.List = TabList;
_Tabs.TabPanel = TabPanel;
_Tabs.Item = Tab;

export { _Tabs as Tabs };
