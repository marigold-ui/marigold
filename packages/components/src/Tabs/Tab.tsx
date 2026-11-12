import * as m from 'motion/react-m';
import type RAC from 'react-aria-components';
import { Tab as RACTab } from 'react-aria-components/Tabs';
import { cn } from '@marigold/system';
import { INDICATOR_TRANSITION } from '../motionTransitions';
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

          {renderProps.isSelected && (
            <m.span
              data-testid="tab-indicator"
              className={cn('rounded-none', classNames.tabIndicator)}
              transition={INDICATOR_TRANSITION}
              layoutId={'tab-indicator'}
            />
          )}
        </>
      )}
    </RACTab>
  );
};

export { Tab };
