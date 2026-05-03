import { useMemo } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Provider, Toolbar, useContextProps } from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';
import { ActionButtonGroupContext } from './Context';

type RemovedProps = 'className' | 'style' | 'isDisabled';

export interface ActionButtonGroupProps
  extends Omit<RAC.ToolbarProps, RemovedProps>, AriaLabelingProps {
  /**
   * Cascades the variant to nested ActionButtons.
   */
  variant?: string;
  /**
   * Cascades the size to nested ActionButtons.
   */
  size?: string;
  /**
   * Disables all nested ActionButtons.
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
  slot?: string | null;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const ActionButtonGroup = ({
  ref: refProp,
  ...inputProps
}: ActionButtonGroupProps) => {
  const [merged, ref] = useContextProps(
    inputProps as ActionButtonGroupProps & { className?: string },
    refProp,
    ActionButtonGroupContext
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

  const cascadedContext = useMemo(
    () => ({ variant, size, disabled }),
    [variant, size, disabled]
  );

  return (
    <Provider values={[[ActionButtonGroupContext, cascadedContext]]}>
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
