import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { SwitchFieldContext } from 'react-aria-components';
import { SwitchButton, SwitchField } from 'react-aria-components/Switch';
import { WidthProp, cn, createWidthVar, useClassNames } from '@marigold/system';
import { BooleanField } from '../FieldBase/BooleanField';
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
   * A helpful text.
   */
  description?: ReactNode;

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
  ref?: Ref<HTMLLabelElement>;
}

const _Switch = ({
  variant,
  size,
  width = 'full',
  label,
  description,
  selected,
  disabled,
  readOnly,
  ref,
  ...rest
}: SwitchProps) => {
  const classNames = useClassNames({ component: 'Switch', size, variant });
  const props = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isSelected: selected,
    ...rest,
  } satisfies RAC.SwitchFieldProps;
  return (
    <BooleanField
      description={description}
      variant={variant}
      context={SwitchFieldContext}
    >
      {/* `SwitchField` provides the field context/`aria-describedby` wiring for
          the new non-deprecated RAC API. `display: contents` keeps it
          transparent to the `BooleanField` grid so the subgrid alignment of
          label, track, and description is preserved. The width lives on the
          `SwitchButton` (the rendered `label`), matching the standalone layout. */}
      <SwitchField {...props} className="contents">
        <SwitchButton
          ref={ref}
          className={cn('group/switch w-(--width)', classNames.container)}
          style={createWidthVar('width', width)}
        >
          {variant === 'settings' && label && (
            <Label elementType="span">{label}</Label>
          )}
          <div className="relative">
            <div className={classNames.track}>
              <div className={classNames.thumb} />
            </div>
          </div>
          {variant !== 'settings' && label && (
            <Label elementType="span">{label}</Label>
          )}
        </SwitchButton>
      </SwitchField>
    </BooleanField>
  );
};

export { _Switch as Switch };
