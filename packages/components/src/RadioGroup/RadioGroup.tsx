import React, { ReactNode, useContext } from 'react';
import { useRadioGroup } from '@react-aria/radio';
import { RadioGroupState, useRadioGroupState } from '@react-stately/radio';
import { AriaRadioGroupProps } from '@react-types/radio';

import { Box, useComponentStyles } from '@marigold/system';

import { Label } from '../Field/Label';

// Theme Extension
// ---------------

// Context
// ---------------
// TODO: Pass down error as well?
export interface RadioGroupContextProps extends RadioGroupState {
  variant?: string;
  size?: string;
}

const RadioContext = React.createContext<RadioGroupContextProps>(null as any);
export const useRadioGroupContext = () => useContext(RadioContext);

// Props
// ---------------
interface RadioGroupProps
  extends Omit<
    AriaRadioGroupProps,
    'isDisabled' | 'isRquired' | 'isReadOnly ' | 'validationState'
  > {
  children: ReactNode[];
  variant?: string;
  size?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
}

// Component
// ---------------
export const RadioGroup = ({
  children,
  size,
  variant,
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
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  const styles = useComponentStyles(
    'CheckboxGroup',
    { variant, size },
    { parts: ['container', 'group'] }
  );

  return (
    <Box {...radioGroupProps}>
      {props.label && (
        <Label as="span" required={required} {...labelProps}>
          {props.label}
        </Label>
      )}
      <Box
        role="presentation"
        __baseCSS={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
        css={styles.group}
      >
        <RadioContext.Provider value={{ variant, size, ...state }}>
          {children}
        </RadioContext.Provider>
      </Box>
    </Box>
  );
};
