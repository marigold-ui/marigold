import React, { ReactNode } from 'react';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';
import { AriaRadioGroupProps } from '@react-types/radio';

import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';

import { Label } from '../Label';
import { RadioGroupContext } from './Context';
import { FieldBase } from '../FieldBase';
import { isFocusVisible } from '@react-aria/interactions';

// Theme Extension
// ---------------
export interface RadioGroupThemeExtension
  extends ThemeExtensionsWithParts<'RadioGroup', ['container', 'group']> {}

// Props
// ---------------
export interface RadioGroupProps
  extends Omit<
    AriaRadioGroupProps,
    'isDisabled' | 'isRquired' | 'isReadOnly ' | 'validationState'
  > {
  children: ReactNode[];
  variant?: string;
  size?: string;
  width?: string;
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
  size,
  variant,
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
  });

  const styles = useComponentStyles(
    'RadioGroup',
    { variant, size },
    { parts: ['container', 'group'] }
  );

  return (
    <FieldBase
      variant={variant}
      size={size}
      width={width}
      label={props.label}
      labelProps={{ as: 'span', ...labelProps }}
      description={props.description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={props.errorMessage}
      errorMessageProps={errorMessageProps}
      disabled={disabled}
      stateProps={stateProps}
      required={required}
      {...radioGroupProps}
    >
      <Box
        role="presentation"
        data-orientation={orientation}
        __baseCSS={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          alignItems: 'start',
          gap: orientation === 'vertical' ? '0.5ch' : '1.5ch',
        }}
        css={styles.group}
      >
        <RadioGroupContext.Provider
          value={{ variant, size, width, error, ...state }}
        >
          {children}
        </RadioGroupContext.Provider>
      </Box>
    </FieldBase>
  );
};
