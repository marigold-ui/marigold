import { useMemo } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Toolbar } from 'react-aria-components/Toolbar';
import { Provider, useContextProps } from 'react-aria-components/slots';
import type { AriaLabelingProps } from '@marigold/types';
import { ButtonContext } from '../Button/Context';
import type { SlotProps } from '../types';

type RemovedProps = 'className' | 'style' | 'isDisabled' | 'slot';

export interface ButtonGroupProps
  extends Omit<RAC.ToolbarProps, RemovedProps>, AriaLabelingProps, SlotProps {
  /**
   * Cascades the variant to nested buttons. A local `variant` on a child
   * (`Button`, `LinkButton`, `ActionMenu`) wins over the group default.
   *
   * When unset, the group cascades `'ghost'` to nested buttons so an
   * unconfigured cluster still renders as a uniform ghost cluster.
   * @default 'ghost'
   */
  variant?: string;
  /**
   * Cascades the size to nested buttons. A local `size` on a child wins over
   * the group default.
   */
  size?: string;
  /**
   * Disables every nested button by default. A child can re-enable itself
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

export const ButtonGroup = ({
  ref: refProp,
  ...inputProps
}: ButtonGroupProps) => {
  // Read the incoming `ButtonContext` (e.g. Panel.Header's `[grid-area:actions]`
  // + `size:'icon'`) to position the GROUP itself: the positional `className`
  // rides along in `...props` onto the `<Toolbar>`.
  const [merged, ref] = useContextProps(
    inputProps as ButtonGroupProps & { className?: string },
    refProp,
    ButtonContext
  );

  const {
    variant,
    size,
    disabled,
    orientation = 'horizontal',
    children,
    ...props
  } = merged;

  // Re-provide a FRESH `ButtonContext` to children. RAC `Provider` values
  // replace rather than merge, so this drops the positional className the group
  // just claimed and cascades only `variant`/`size`/`disabled` — reproducing
  // the old `RESET_BUTTON_CTX` behaviour for free. Cascade `'ghost'` when unset
  // so an unconfigured cluster renders as a ghost cluster.
  const ctx = useMemo(
    () => ({ variant: variant ?? 'ghost', size, disabled }),
    [variant, size, disabled]
  );

  return (
    <Provider values={[[ButtonContext, ctx]]}>
      <Toolbar {...props} ref={ref} orientation={orientation}>
        {children}
      </Toolbar>
    </Provider>
  );
};
