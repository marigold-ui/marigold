import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components/Button';
import {
  useContextProps,
  useSlottedContext,
} from 'react-aria-components/slots';
import { cn, useClassNames } from '@marigold/system';
import { ActionGroupContext } from '../ActionGroup/Context';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import type { SlotProps } from '../types';
import { ActionButtonContext, type ActionButtonContextValue } from './Context';

type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style' | 'slot';

export interface ActionButtonProps
  extends Omit<RAC.ButtonProps, RemovedProps>, SlotProps {
  /**
   * Visual variant of the action button.
   *
   * `<ActionButton>` is slot-aware: inside a slot-configured container
   * (`Panel.Header`, `Page.Header`, …) it claims the container's action
   * cell and inherits its size cascade. The `primary` variant exists for
   * the prominent action of such a container — e.g. the page-level call to
   * action inside a `<Page.Header>`. For a standalone primary action that
   * is not part of a container's chrome, reach for [`<Button>`](./button).
   * @default 'default'
   */
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive-ghost'
    | 'link'
    | (string & {});
  /**
   * Size of the action button. Applied when `<ActionButton>` is used on
   * its own. Inside an `<ActionGroup>` the group's `size` wins so the
   * cluster stays visually uniform.
   */
  size?: 'default' | 'small' | 'large' | 'icon' | (string & {});
  children?: ReactNode;
  /**
   * Disables the button.
   * @default false
   */
  disabled?: RAC.ButtonProps['isDisabled'];
  /**
   * Whether the button is in a loading state.
   */
  loading?: RAC.ButtonProps['isPending'];
  ref?: Ref<HTMLButtonElement>;
}

export const ActionButton = ({
  ref: refProp,
  ...inputProps
}: ActionButtonProps) => {
  const [merged, ref] = useContextProps(
    inputProps as ActionButtonContextValue,
    refProp,
    ActionButtonContext
  );

  const groupCtx = useSlottedContext(ActionGroupContext);

  const {
    children,
    variant: ownVariant,
    size: ownSize,
    disabled: ownDisabled,
    loading,
    className,
    ...props
  } = merged;

  // Cascade with the enclosing ActionGroup. Reads left-to-right; `size` is
  // the outlier (group wins) so the cluster stays visually uniform.
  const variant = ownVariant ?? groupCtx?.variant ?? 'default';
  const size = groupCtx?.size ?? ownSize;
  const disabled = ownDisabled ?? groupCtx?.disabled;

  const classNames = useClassNames({
    component: 'ActionButton',
    variant,
    size,
  });

  return (
    <Button
      {...props}
      ref={ref}
      className={cn(className, classNames, loading && 'cursor-progress!')}
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
};
