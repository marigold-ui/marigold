import React, { createContext, ReactNode, useContext } from 'react';
import { useCheckboxGroup } from '@react-aria/checkbox';
import {
  CheckboxGroupState,
  useCheckboxGroupState,
} from '@react-stately/checkbox';
import { AriaCheckboxGroupProps } from '@react-types/checkbox';

import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Label } from '../Field/Label';

// Context
// ---------------
export interface CheckboxGroupContextProps extends CheckboxGroupState {
  error?: boolean;
  variant?: string;
  size?: string;
}

/**
 * Needs to be falsy so we can check if a checkbox is used as standalone
 * or in a group.
 */
export const CheckboxGroupContext = createContext<CheckboxGroupContextProps>(
  null as any
);
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);

// Theme Extension
// ---------------
export interface CheckboxGroupThemeExtension
  extends ThemeExtensionsWithParts<'CheckboxGroup', ['container', 'group']> {}

// Props
// ---------------
interface CheckboxGroupProps
  extends Omit<ComponentProps<'div'>, 'onChange'>,
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
  variant,
  size,
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
  const { groupProps, labelProps } = useCheckboxGroup(props, state);

  const styles = useComponentStyles(
    'CheckboxGroup',
    { variant, size },
    { parts: ['container', 'group'] }
  );

  return (
    <Box {...groupProps} css={styles.container}>
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
          alignItems: 'start',
        }}
        css={styles.group}
      >
        <CheckboxGroupContext.Provider
          value={{ variant, size, error, ...state }}
        >
          {children}
        </CheckboxGroupContext.Provider>
      </Box>
    </Box>
  );
};
