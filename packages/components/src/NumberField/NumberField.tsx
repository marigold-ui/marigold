import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Group, NumberField } from 'react-aria-components';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Input } from '../Input/Input';
import { StepButton } from './StepButton';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'size';

export interface NumberFieldProps
  extends Omit<RAC.NumberFieldProps, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.NumberFieldProps['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.NumberFieldProps['isRequired'];

  /**
   * If `true`, the field is considered invalid and if set the errorMessage is shown instead of the `description`.
   * @default false
   */
  error?: RAC.NumberFieldProps['isInvalid'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.NumberFieldProps['isReadOnly'];

  /**
   * Property for hiding the step buttons of the field.
   * @default false
   */
  hideStepper?: boolean;

  /**
   * Placeholder text for the input field.
   * @default none
   */
  placeholder?: string;
}

// Component
// ---------------
const _NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      variant,
      size,
      disabled,
      required,
      readOnly,
      error,
      hideStepper,
      ...rest
    }: NumberFieldProps,
    ref
  ) => {
    const classNames = useClassNames({
      component: 'NumberField',
      size,
      variant,
    });

    const props: RAC.NumberFieldProps = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isInvalid: error,
      isRequired: required,
      ...rest,
    };

    const showStepper = !hideStepper;

    return (
      <FieldBase as={NumberField} {...props}>
        <Group className={cn('flex items-stretch', classNames.group)}>
          {showStepper && (
            <StepButton
              className={classNames.stepper}
              direction="down"
              slot="decrement"
            />
          )}
          <div className="flex-1">
            <Input
              ref={ref}
              variant={variant}
              size={size}
              className={classNames.input}
            />
          </div>
          {showStepper && (
            <StepButton
              className={classNames.stepper}
              direction="up"
              slot="increment"
            />
          )}
        </Group>
      </FieldBase>
    );
  }
);

export { _NumberField as NumberField };
