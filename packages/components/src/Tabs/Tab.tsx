import type RAC from 'react-aria-components';
import { Tab as RACTab, SelectionIndicator } from 'react-aria-components/Tabs';
import { cn } from '@marigold/system';
import { useTabContext } from './Context';

// Props
// ----------------------
export type TabProps = Omit<RAC.TabProps, 'className' | 'style'>;

// Component
// ----------------------
const Tab = (props: TabProps) => {
  const { classNames } = useTabContext();
  const { children: content, ...restProps } = props;
  return (
    <RACTab
      {...restProps}
      className={({ isDisabled }) =>
        cn(
          'flex cursor-pointer justify-center',
          isDisabled && 'cursor-not-allowed',
          classNames.tab
        )
      }
    >
      {renderProps => (
        <>
          {/* Internal check to support both functional and static children */}
          {typeof content === 'function' ? content(renderProps) : content}

          <SelectionIndicator
            data-testid="tab-indicator"
            className={cn('rounded-none', classNames.tabIndicator)}
          />
        </>
      )}
    </RACTab>
  );
};

export { Tab };
