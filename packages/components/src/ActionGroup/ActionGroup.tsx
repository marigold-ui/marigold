import { useMemo } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Provider, Toolbar, useContextProps } from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';
import { ActionButtonContext } from '../ActionButton/Context';
import type { SlotProps } from '../types';
import { ActionGroupContext } from './Context';

// Reset ActionButtonContext so children don't inherit a positional className
// that was published for the group itself to claim.
const RESET_BUTTON_CTX = {};

type RemovedProps = 'className' | 'style' | 'isDisabled' | 'slot';

export interface ActionGroupProps
  extends Omit<RAC.ToolbarProps, RemovedProps>, AriaLabelingProps, SlotProps {
  /**
   * Cascades the variant to nested actions. Local `variant` on a child
   * (`ActionButton`, `ActionMenu`) wins over the group default.
   *
   * When unset, the group cascades `'default'` to nested actions so an
   * unconfigured cluster still renders uniformly.
   * @default 'default'
   */
  variant?: string;
  /**
   * Cascades the size to nested actions. The group's size wins over a
   * child's local `size` so the cluster stays visually uniform.
   */
  size?: string;
  /**
   * Disables every nested action by default. A child can re-enable itself
   * with `disabled={false}`.
   */
  disabled?: boolean;
  /**
   * Orientation of the toolbar.
   * @default 'horizontal'
   */
  orientation?: RAC.ToolbarProps['orientation'];
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const ActionGroup = ({
  ref: refProp,
  ...inputProps
}: ActionGroupProps) => {
  const [merged, ref] = useContextProps(
    inputProps as ActionGroupProps & { className?: string },
    refProp,
    ActionGroupContext
  );

  const {
    variant,
    size,
    disabled,
    orientation = 'horizontal',
    children,
    ...props
  } = merged;

  const ctx = useMemo(
    () => ({ variant: variant ?? 'default', size, disabled }),
    [variant, size, disabled]
  );

  return (
    <Provider
      values={[
        [ActionGroupContext, ctx],
        [ActionButtonContext, RESET_BUTTON_CTX],
      ]}
    >
      <Toolbar {...props} ref={ref} orientation={orientation}>
        {children}
      </Toolbar>
    </Provider>
  );
};
