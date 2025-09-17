import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface LinkButtonProps extends Omit<RAC.LinkProps, RemovedProps> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'ghost'
    | 'link'
    | (string & {});
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
  disabled?: RAC.LinkProps['isDisabled'];
}

const _LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ children, variant, size, disabled, fullWidth, ...props }, ref) => {
    const classNames = useClassNames({
      component: 'Button',
      variant,
      size,
    });

    return (
      <Link
        {...props}
        ref={ref}
        className={cn(classNames, fullWidth ? 'w-full' : undefined)}
        isDisabled={disabled}
      >
        {children}
      </Link>
    );
  }
);

export { _LinkButton as LinkButton };
