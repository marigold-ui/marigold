import type RAC from 'react-aria-components';
import { Tab } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTabContext } from './Context';

// props
// ----------------------
export interface TabProps extends Omit<RAC.TabProps, 'className' | 'style'> {}

// component
// ----------------------
const _Tab = (props: TabProps) => {
  const { classNames } = useTabContext();

  return (
    <Tab
      {...props}
      className={cn(
        'flex cursor-pointer justify-center aria-disabled:cursor-not-allowed',
        classNames.tab
      )}
    >
      {props.children}
    </Tab>
  );
};

export { _Tab as Tab };
