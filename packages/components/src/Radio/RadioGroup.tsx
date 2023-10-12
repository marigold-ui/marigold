import { ReactNode } from 'react';

import { useRadioGroup } from '@react-aria/radio';

import { useRadioGroupState } from '@react-stately/radio';

import { AriaRadioGroupProps } from '@react-types/radio';

import { WidthProp, cn, useStateProps } from '@marigold/system';

import { FieldBase } from '../FieldBase';
import { RadioGroupContext } from './Context';

// Props
// ---------------
export interface RadioGroupProps
  extends Omit<
    AriaRadioGroupProps,
    'isDisabled' | 'isRquired' | 'isReadOnly ' | 'validationState'
  > {
  children: ReactNode[];
  width?: WidthProp['width'];
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
}

// Component
// ---------------
export const RadioGroup = ({
  children,
  orientation = 'vertical',
  width,
  required,
  disabled,
  readOnly,
  error,
  ...rest
}: RadioGroupProps) => {
  const props: AriaRadioGroupProps = {
    isRequired: required,
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: error ? 'invalid' : 'valid',
    ...rest,
  };

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, errorMessageProps, descriptionProps } =
    useRadioGroup(props, state);

  const stateProps = useStateProps({
    disabled,
    readOnly,
    error,
    required,
  });

  return (
    <FieldBase
      width={width}
      label={props.label}
      labelProps={{ elementType: 'span', ...labelProps }}
      description={props.description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={props.errorMessage}
      errorMessageProps={errorMessageProps}
      disabled={disabled}
      stateProps={stateProps}
      {...radioGroupProps}
    >
      <div
        role="presentation"
        data-orientation={orientation}
        className={cn(
          'flex items-start',
          orientation === 'vertical'
            ? 'flex-col gap-[0.5ch]'
            : 'flex-row gap-[1.5ch]'
        )}
      >
        <RadioGroupContext.Provider value={{ width, error, state }}>
          {children}
        </RadioGroupContext.Provider>
      </div>
    </FieldBase>
  );
};
