import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import {
  Button,
  useContextProps,
  useSlottedContext,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ActionGroupContext } from '../ActionGroup/Context';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import type { SlotProps } from '../types';
import { ActionButtonContext } from './Context';

type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style' | 'slot';

export interface ActionButtonProps
  extends Omit<RAC.ButtonProps, RemovedProps>, SlotProps {
  /**
   * Visual variant of the action button. Reuses Button styles for v1.
   * @default 'ghost'
   */
  variant?:
    | 'ghost'
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
    inputProps as ActionButtonProps & { className?: string },
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
    className: contextClassName,
    ...rest
  } = merged;

  // Cascade with the enclosing ActionGroup. Reads left-to-right; `size` is
  // the outlier (group wins) so the cluster stays visually uniform.
  const variant = ownVariant ?? groupCtx?.variant ?? 'ghost';
  const size = groupCtx?.size ?? ownSize;
  const disabled = ownDisabled ?? groupCtx?.disabled;

  const classNames = useClassNames({
    component: 'Button',
    variant,
    size,
  });

  return (
    <Button
      {...rest}
      ref={ref}
      className={cn(
        contextClassName,
        classNames,
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
};
