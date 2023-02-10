import React, { createContext, ReactNode, useContext } from 'react';
import { useCheckboxGroup } from '@react-aria/checkbox';
import {
  CheckboxGroupState,
  useCheckboxGroupState,
} from '@react-stately/checkbox';
import { AriaCheckboxGroupProps } from '@react-types/checkbox';

import { Box, useStateProps } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { FieldBase } from '../FieldBase';

// Context
// ---------------
export interface CheckboxGroupContextProps extends CheckboxGroupState {
  error?: boolean;
}

/**
 * Needs to be falsy so we can check if a checkbox is used as standalone
 * or in a group.
 */
export const CheckboxGroupContext = createContext<CheckboxGroupContextProps>(
  null as any
);
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);

// Props
// ---------------
interface CheckboxGroupProps
  extends Omit<HtmlProps<'div'>, 'onChange'>,
    AriaCheckboxGroupProps {
  children: ReactNode;
  variant?: string;
  size?: string;
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

// Components
// ---------------
export const CheckboxGroup = ({
  children,
  required,
  disabled,
  readOnly,
  error,
  ...rest
}: CheckboxGroupProps) => {
  const props = {
    isRequired: required,
    isDisabled: disabled,
    isReadOnly: readOnly,
    validationState: error ? 'invalid' : 'valid',
    ...rest,
  } as const;

  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);

  const stateProps = useStateProps({
    disabled,
    readOnly,
    error,
  });

  return (
    <FieldBase
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
      {...groupProps}
    >
      <Box
        role="presentation"
        __baseCSS={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <CheckboxGroupContext.Provider value={{ error, ...state }}>
          {children}
        </CheckboxGroupContext.Provider>
      </Box>
    </FieldBase>
  );
};
