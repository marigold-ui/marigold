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
   * Control the width of the field. Use `"full"` to make the segments divide
   * the available width equally (same as the former `fullWidth` prop).
   */
  width?: WidthProp['width'];
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

function SegmentedControlBase({
  variant,
  size,
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
}: SegmentedControlProps) {
  const classNames = useClassNames({
    component: 'SegmentedControl',
    variant,
    size,
  });

  const expandWidth = !!width;

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
          expandWidth ? 'flex w-full' : 'inline-flex w-fit'
        )}
      >
        <SegmentedControlContext value={{ variant, size, expandWidth }}>
          {children}
        </SegmentedControlContext>
      </div>
    </FieldBase>
  );
}

// SegmentedControlOption
// ---------------
type RemovedOptionProps = 'className' | 'style' | 'render' | 'isDisabled';

export interface SegmentedControlOptionProps extends Omit<
  RAC.RadioFieldProps,
  RemovedOptionProps
> {
  /**
   * The value of the option, matching the `value` of the control.
   */
  value: string;
  /**
   * Whether the option is disabled.
   * @default false
   */
  disabled?: RAC.RadioFieldProps['isDisabled'];
  variant?: string;
  size?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

function SegmentedControlOption({
  disabled,
  variant,
  size,
  children,
  ...props
}: SegmentedControlOptionProps) {
  const context = use(SegmentedControlContext);

  const classNames = useClassNames({
    component: 'SegmentedControl',
    variant: variant ?? context.variant,
    size: size ?? context.size,
  });

  return (
    <RadioField
      isDisabled={disabled}
      className={cn(classNames.field, context.expandWidth && 'grow basis-0')}
      {...props}
    >
      <SelectionIndicator className={classNames.indicator} />
      <RadioButton className={classNames.option}>{children}</RadioButton>
    </RadioField>
  );
}

// Compound export
// ---------------
export const SegmentedControl = Object.assign(SegmentedControlBase, {
  Option: SegmentedControlOption,
});

export { SegmentedControlOption };
