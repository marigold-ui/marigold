import { useMemo } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Provider, Toolbar, useContextProps } from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';
import { ActionGroupContext } from './Context';

type RemovedProps = 'className' | 'style' | 'isDisabled';

export interface ActionGroupProps
  extends Omit<RAC.ToolbarProps, RemovedProps>, AriaLabelingProps {
  /**
   * Cascades the variant to nested actions. Local `variant` on a child
   * (`ActionButton`, `ActionMenu`) wins over the group default.
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
   * @default false
   */
  disabled?: boolean;
  /**
   * Orientation of the toolbar.
   * @default 'horizontal'
   */
  orientation?: RAC.ToolbarProps['orientation'];
  /**
   * A slot to place the element in.
   */
  slot?: string;
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
    className: contextClassName,
    ...rest
  } = merged;

  // Publish a `ghost` baseline so any action consumer renders low-emphasis
  // without each one repeating the fallback.
  const ctx = useMemo(
    () => ({ variant: variant ?? 'ghost', size, disabled }),
    [variant, size, disabled]
  );

  return (
    <Provider values={[[ActionGroupContext, ctx]]}>
      <Toolbar
        {...rest}
        ref={ref}
        orientation={orientation}
        className={contextClassName}
      >
        {children}
      </Toolbar>
    </Provider>
  );
};
