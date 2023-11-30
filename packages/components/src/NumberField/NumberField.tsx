import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Group, NumberField } from 'react-aria-components';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase/_FieldBase';
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
  width?: WidthProp['width'];
  disabled?: RAC.NumberFieldProps['isDisabled'];
  required?: RAC.NumberFieldProps['isRequired'];
  error?: RAC.NumberFieldProps['isInvalid'];
  readOnly?: RAC.NumberFieldProps['isReadOnly'];
  hideStepper?: boolean;
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
