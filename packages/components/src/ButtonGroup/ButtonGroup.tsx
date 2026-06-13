import { useMemo } from 'react';
import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Toolbar } from 'react-aria-components/Toolbar';
import { Provider, useContextProps } from 'react-aria-components/slots';
import { cn } from '@marigold/system';
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
   * When unset, the group cascades `'secondary'` to nested buttons, the same
   * baseline as a standalone `Button`. Slot-aware parents like `Panel.Header`
   * and `SelectList.Option` override this with a lower-emphasis variant.
   * @default 'secondary'
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
  // Read the incoming `ButtonContext` (e.g. Panel.Header's positional
  // className) to position the group itself; it rides along onto the `<Toolbar>`.
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
    className,
    children,
    ...props
  } = merged;

  // Re-provide a fresh `ButtonContext` to children. RAC `Provider` values
  // replace rather than merge, so this drops the group's positional className
  // and cascades only `variant`/`size`/`disabled`, defaulting `variant` to
  // `'secondary'` (parents like Panel.Header override with `'ghost'`).
  const ctx = useMemo(
    () => ({ variant: variant ?? 'secondary', size, disabled }),
    [variant, size, disabled]
  );

  return (
    <Provider values={[[ButtonContext, ctx]]}>
      <Toolbar
        {...props}
        ref={ref}
        orientation={orientation}
        className={cn(
          // Structural layout so a standalone cluster is spaced sensibly.
          'flex gap-1',
          orientation === 'vertical' ? 'flex-col items-start' : 'items-center',
          // A container's positional className rides along and can override.
          className
        )}
      >
        {children}
      </Toolbar>
    </Provider>
  );
};
