import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components/Link';
import { useSlottedContext } from 'react-aria-components/slots';
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
  // `useSlottedContext` (vs `<ActionButton>`'s `useContextProps`) sidesteps
  // the button/anchor ref-type mismatch; policy below mirrors `<ActionButton>`.
  const ctxValue = useSlottedContext(ActionButtonContext, slot);
  const groupCtx = useSlottedContext(ActionGroupContext);

  // Cascade with the enclosing ActionGroup. Reads left-to-right; `size` is
  // the outlier (group wins) so the cluster stays visually uniform.
  const variant = propVariant ?? ctxValue?.variant ?? groupCtx?.variant;
  const size = groupCtx?.size ?? propSize ?? ctxValue?.size;
  const disabled = propDisabled ?? ctxValue?.disabled ?? groupCtx?.disabled;

  // Standalone LinkButton uses Button styles; inside ActionGroup it picks up ActionButton's narrowed set.
  const classNames = useClassNames({
    component: groupCtx ? 'ActionButton' : 'Button',
    variant,
    size,
  });

  return (
    <Link
      {...props}
      ref={ref}
      slot={slot}
      className={cn(
        ctxValue?.className,
        classNames,
        fullWidth ? 'w-full' : undefined
      )}
      isDisabled={disabled}
    >
      {children}
    </Link>
  );
};

export { _LinkButton as LinkButton };
