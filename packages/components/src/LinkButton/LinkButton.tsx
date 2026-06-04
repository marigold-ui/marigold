import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components/Link';
import { useSlottedContext } from 'react-aria-components/slots';
import { cn, useClassNames } from '@marigold/system';
import { ButtonContext } from '../Button/Context';

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
  // `useSlottedContext` (not `useContextProps`) sidesteps the anchor/button
  // ref mismatch. Same context and precedence as `<Button>`: a local prop
  // wins, `slot={null}` opts out.
  const ctx = useSlottedContext(ButtonContext, slot);

  const variant = propVariant ?? ctx?.variant;
  const size = propSize ?? ctx?.size;
  const disabled = propDisabled ?? ctx?.disabled;

  // Always uses `Button` styles so it matches the cluster's cascaded variant.
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
      className={cn(
        ctx?.className,
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
