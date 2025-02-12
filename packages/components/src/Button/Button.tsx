import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ProgressCycle } from '../ProgressCycle';

// Button is currently only component accepting className because of internal use.
type RemovedProps = 'isDisabled' | 'isPending';

export interface ButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * Stretches the button width with full available space.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Class of the component.
   */
  className?: string;
  /**
   * Children of the component
   */
  children?: ReactNode;

  /**
   * Disables the button.
   * @default false
   */
  disabled?: RAC.ButtonProps['isDisabled'];
  /**
   * Whether the button is in a loading state.
   * This disables press and hover events while retaining focusability, and announces the loading state to screen readers.
   */
  loading?: RAC.ButtonProps['isPending'];
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      className,
      disabled,
      loading,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const classNames = useClassNames({
      component: 'Button',
      variant,
      size,
      className,
    });

    return (
      <Button
        {...props}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-[0.5ch]',
          classNames,
          fullWidth ? 'w-full' : undefined,
          loading && 'cursor-progress!'
        )}
        isPending={loading}
        isDisabled={disabled}
      >
        {loading ? (
          <>
            <span className="absolute">
              <ProgressCycle />
            </span>
            <span className="invisible flex gap-[inherit]">{children}</span>
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

export { _Button as Button };
