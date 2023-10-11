import { ReactNode, forwardRef } from 'react';
import {
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

// Button is currently only component accepting className because of internal use.
type RemovedProps = 'isDisabled' | 'formAction' | 'value';

export interface ButtonProps extends Omit<RACButtonProps, RemovedProps> {
  variant?: string;
  size?: string;
  fullWidth?: boolean;
  children?: ReactNode;
  disabled?: RACButtonProps['isDisabled'];
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, disabled, fullWidth, ...props }, ref) => {
    const classNames = useClassNames({
      component: 'Button',
      variant,
      size,
    });

    return (
      <RACButton
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
      </RACButton>
    );
  }
);
