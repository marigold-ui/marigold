import { ReactNode, forwardRef } from 'react';
import { Button } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

// Button is currently only component accepting className because of internal use.
type RemovedProps = 'isDisabled';

export interface ButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  /**
   * The available variants of this component.
   */
  variant?: string;
  /**
   * The available sizes of this component.
   */
  size?: string;

  /**
   * Stretches the button width with full available space.
   */
  fullWidth?: boolean;

  className?: string;
  /**
   * Children of the component
   */
  children?: ReactNode;

  /**
   * Disables the button.
   */
  disabled?: RAC.ButtonProps['isDisabled'];
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant, size, className, disabled, fullWidth, ...props },
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
          fullWidth ? 'w-full' : undefined
        )}
        isDisabled={disabled}
      >
        {children}
      </Button>
    );
  }
);

export { _Button as Button };
