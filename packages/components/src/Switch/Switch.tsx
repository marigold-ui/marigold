import { ReactNode, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { SwitchButton, SwitchField } from 'react-aria-components';
import { WidthProp, cn, createWidthVar, useClassNames } from '@marigold/system';
import { Label } from '../Label/Label';

type RemovedProps =
  | 'children'
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isSelected'
  | 'slot';

export interface SwitchProps extends Omit<RAC.SwitchFieldProps, RemovedProps> {
  variant?: string;
  size?: string;

  /**
   * Set the label of the switch.
   */
  label?: ReactNode;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * Disables the switch.
   * @default false
   */
  disabled?: RAC.SwitchFieldProps['isDisabled'];

  /**
   * Set the switch to read-only.
   * @default false
   */
  readOnly?: RAC.SwitchFieldProps['isReadOnly'];

  /**
   * With this prop you can set the switch selected.
   * @default false
   */
  selected?: RAC.SwitchFieldProps['isSelected'];
}

const _Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  (
    {
      variant,
      size,
      width = 'full',
      label,
      selected,
      disabled,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const classNames = useClassNames({ component: 'Switch', size, variant });
    const props = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isSelected: selected,
      ...rest,
    } satisfies RAC.SwitchFieldProps;
    return (
      // Width is split across two levels: the outer SwitchField sizes itself to
      // the `width` prop via the `--width` CSS variable, and the inner
      // SwitchButton fills that width with `w-full`.
      <SwitchField
        {...props}
        className="w-(--width)"
        style={createWidthVar('width', width)}
      >
        <SwitchButton
          ref={ref}
          className={cn(
            'group/switch flex w-full items-center gap-[1ch]',
            classNames.container
          )}
        >
          {label && <Label elementType="span">{label}</Label>}
          <div className="relative">
            <div className={classNames.track}>
              <div className={classNames.thumb} />
            </div>
          </div>
        </SwitchButton>
      </SwitchField>
    );
  }
);

export { _Switch as Switch };
