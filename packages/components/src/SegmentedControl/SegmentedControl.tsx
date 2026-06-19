import type { ReactNode, Ref } from 'react';
import { use } from 'react';
import type RAC from 'react-aria-components';
import {
  RadioButton,
  RadioField,
  RadioGroup,
} from 'react-aria-components/RadioGroup';
import { SelectionIndicator } from 'react-aria-components/SelectionIndicator';
import { type WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { SegmentedControlContext } from './Context';

// SegmentedControl
// ---------------
type RemovedGroupProps =
  | 'className'
  | 'style'
  | 'render'
  | 'isDisabled'
  | 'isInvalid'
  | 'isRequired'
  | 'isReadOnly'
  | 'orientation';

export interface SegmentedControlProps extends Omit<
  RAC.RadioGroupProps,
  RemovedGroupProps
> {
  /**
   * The visual style of the control.
   * @default default
   */
  variant?: 'default' | 'ghost' | (string & {});
  /**
   * @default default
   */
  size?: 'default' | 'small' | (string & {});
  /**
   * Whether the items divide the available width equally.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Set the label of the control.
   */
  label?: ReactNode;
  /**
   * Set the control's help text.
   */
  description?: string;
  /**
   * Set the control's error message, shown when `error` is `true`.
   */
  errorMessage?: string;
  /**
   * If `true`, the control is invalid and the `errorMessage` is shown.
   * @default false
   */
  error?: RAC.RadioGroupProps['isInvalid'];
  /**
   * If `true`, the control is required.
   * @default false
   */
  required?: RAC.RadioGroupProps['isRequired'];
  /**
   * If `true`, the control is disabled.
   * @default false
   */
  disabled?: RAC.RadioGroupProps['isDisabled'];
  /**
   * Set the control as read-only.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Control the width of the field.
   */
  width?: WidthProp['width'];
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const _SegmentedControl = ({
  variant,
  size,
  fullWidth,
  label,
  error,
  disabled,
  required,
  readOnly,
  description,
  errorMessage,
  width,
  children,
  ...rest
}: SegmentedControlProps) => {
  const classNames = useClassNames({
    component: 'SegmentedControl',
    variant,
    size,
  });

  const props: RAC.RadioGroupProps = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    orientation: 'horizontal',
    ...rest,
  };

  return (
    <FieldBase
      as={RadioGroup}
      width={width}
      label={label}
      description={description}
      errorMessage={errorMessage}
      variant={variant}
      size={size}
      {...props}
    >
      <div
        role="presentation"
        className={cn(
          classNames.group,
          fullWidth ? 'flex w-full' : 'inline-flex w-fit'
        )}
      >
        <SegmentedControlContext value={{ variant, size, fullWidth }}>
          {children}
        </SegmentedControlContext>
      </div>
    </FieldBase>
  );
};

// SegmentedControlItem
// ---------------
type RemovedItemProps = 'className' | 'style' | 'render' | 'isDisabled';

export interface SegmentedControlItemProps extends Omit<
  RAC.RadioFieldProps,
  RemovedItemProps
> {
  /**
   * The value of the item, matching the `value` of the control.
   */
  value: string;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: RAC.RadioFieldProps['isDisabled'];
  variant?: string;
  size?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const _SegmentedControlItem = ({
  disabled,
  variant,
  size,
  children,
  ...props
}: SegmentedControlItemProps) => {
  const context = use(SegmentedControlContext);

  const classNames = useClassNames({
    component: 'SegmentedControl',
    variant: variant ?? context.variant,
    size: size ?? context.size,
  });

  return (
    <RadioField
      isDisabled={disabled}
      className={cn(classNames.field, context.fullWidth && 'grow basis-0')}
      {...props}
    >
      <SelectionIndicator className={classNames.indicator} />
      <RadioButton className={classNames.item}>{children}</RadioButton>
    </RadioField>
  );
};

// Compound export
// ---------------
const SegmentedControl = Object.assign(_SegmentedControl, {
  Item: _SegmentedControlItem,
});

export { SegmentedControl, _SegmentedControlItem as SegmentedControlItem };
