import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
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
  | 'isInvalid'
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
   * If `true`, the switch is considered invalid and, if set, the `errorMessage`
   * is shown instead of the `description`.
   * @default false
   */
  error?: RAC.SwitchFieldProps['isInvalid'];

  /**
   * An error message shown when `error` is set.
   */
  errorMessage?: ReactNode;

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
  error,
  errorMessage,
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
    // The `SwitchButton` (the rendered `label`) carries the width, matching the
    // standalone layout.
    <BooleanField
      as={SwitchField}
      description={description}
      errorMessage={errorMessage}
      error={error}
      variant={variant}
      size={size}
      {...props}
    >
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
    </BooleanField>
  );
};

export { _Switch as Switch };
