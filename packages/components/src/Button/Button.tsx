import { ReactNode, forwardRef } from 'react';
import { Button } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

// Button is currently only component accepting className because of internal use.
type RemovedProps = 'isDisabled';

export interface ButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
  variant?: string;
  size?: string;
  fullWidth?: boolean;
  children?: ReactNode;
  disabled?: RAC.ButtonProps['isDisabled'];
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, disabled, fullWidth, ...props }, ref) => {
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
