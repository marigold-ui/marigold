import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Group, Input, NumberField } from 'react-aria-components';
import { WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
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
  extends
    Omit<RAC.NumberFieldProps, RemovedProps>,
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

    const showStepper = !hideStepper && !readOnly;

    return (
      <FieldBase
        as={NumberField}
        {...props}
        data-readonly={readOnly ? 'true' : undefined}
        data-stepper={showStepper ? 'true' : undefined}
      >
        <Group
          className={cn(
            'flex max-w-(--field-width) items-stretch',
            classNames.group
          )}
        >
          {showStepper && (
            <StepButton
              className={classNames.stepper}
              direction="down"
              slot="decrement"
            />
          )}
          <Input
            ref={ref}
            className={cn('h-full flex-1 outline-none', classNames.input)}
            onFocus={e => e.currentTarget.select()}
          />
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
