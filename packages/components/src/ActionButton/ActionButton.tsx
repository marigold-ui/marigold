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
import { ActionButtonContext } from './Context';

type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface ActionButtonProps extends Omit<RAC.ButtonProps, RemovedProps> {
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
   * Size of the action button.
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
  /**
   * A slot to place the element in.
   */
  slot?: string;
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
    variant: localVariant,
    size: localSize,
    disabled: localDisabled,
    loading,
    className: contextClassName,
    ...rest
  } = merged;

  // Per-prop precedence between local props and the enclosing ActionGroup:
  //   - variant: local wins (allows e.g. a destructive button in a ghost group)
  //   - size: group wins (visual uniformity within a group)
  //   - disabled: local wins, group is the fallback default
  const variant = localVariant ?? groupCtx?.variant ?? 'ghost';
  const size = groupCtx?.size ?? localSize;
  const disabled = localDisabled ?? groupCtx?.disabled;

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
