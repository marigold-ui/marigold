import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Link, useSlottedContext } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroupContext } from '../ActionGroup/Context';

type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface LinkButtonProps extends Omit<RAC.LinkProps, RemovedProps> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'destructive-ghost'
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
  ref?: Ref<HTMLAnchorElement>;
}

const _LinkButton = ({
  children,
  variant: propVariant,
  size: propSize,
  disabled: propDisabled,
  fullWidth,
  ref,
  slot,
  ...props
}: LinkButtonProps) => {
  // Read-only consumption (vs `<ActionButton>`'s `useContextProps`) sidesteps
  // the button/anchor ref-type mismatch.
  const ctxValue = useSlottedContext(ActionButtonContext, slot);
  const groupCtx = useSlottedContext(ActionGroupContext);

  const variant = propVariant ?? ctxValue?.variant ?? groupCtx?.variant;
  const size = groupCtx?.size ?? propSize ?? ctxValue?.size;
  const disabled = propDisabled ?? ctxValue?.disabled ?? groupCtx?.disabled;

  const classNames = useClassNames({
    component: 'Button',
    variant,
    size,
  });

  return (
    <Link
      {...props}
      ref={ref}
      slot={slot}
      className={cn(classNames, fullWidth ? 'w-full' : undefined)}
      isDisabled={disabled}
    >
      {children}
    </Link>
  );
};

export { _LinkButton as LinkButton };
