import { motion } from 'motion/react';
import type RAC from 'react-aria-components';
import { Tab } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTabContext } from './Context';

// props
// ----------------------
export type TabProps = Omit<RAC.TabProps, 'className' | 'style'>;

const TAB_INDICATOR_LAYOUT_ID = 'tab-indicator';

const INDICATOR_TRANSITION = {
  duration: 0.25,
  ease: [0.165, 0.84, 0.44, 1] as const,
};

// component
// ----------------------
const _Tab = (props: TabProps) => {
  const { classNames } = useTabContext();
  const { children: content, ...restProps } = props;

  return (
    <Tab
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
            <motion.span
              data-testid="tab-indicator"
              layoutId={TAB_INDICATOR_LAYOUT_ID}
              className={cn('rounded-none', classNames.tabIndicator)}
              transition={INDICATOR_TRANSITION}
            />
          )}
        </>
      )}
    </Tab>
  );
};

export { _Tab as Tab };
