import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';

type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface ButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'destructive-ghost'
    | 'ghost'
    | 'link'
    | (string & {});

  /**
   * @internal
   */
  size?: 'default' | 'small' | 'large' | 'icon' | (string & {});

  /**
   * If true, the element stretches to fill the available width.
   * @default false
   */
  fullWidth?: boolean;
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
    { children, variant, size, disabled, loading, fullWidth, ...props },
    ref
  ) => {
    const classNames = useClassNames({
      component: 'Button',
      variant,
      size,
    });

    return (
      <Button
        {...props}
        ref={ref}
        className={cn(
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
              <ProgressCircle />
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
