import React, { createContext, ReactNode, useContext } from 'react';
import { useCheckboxGroup } from '@react-aria/checkbox';
import {
  CheckboxGroupState,
  useCheckboxGroupState,
} from '@react-stately/checkbox';

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
  variant?: string;
  size?: string;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextProps>(
  /**
   * Needs to be falsy so we can check if a checkbox is used as standalone
   * or in a group.
   */
  null as any
);

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);

// Theme Extension
// ---------------
export interface CheckboxGroupThemeExtension
  extends ThemeExtensionsWithParts<'CheckboxGroup', ['container', 'group']> {}

// Props
// ---------------
interface CheckboxGroupProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

// Components
// ---------------
export const CheckboxGroup = ({
  label,
  required,
  disabled,
  readonly,
  children,
  variant,
  size,
  ...rest
}: CheckboxGroupProps) => {
  // Adjust props to the react-aria API
  const props = {
    isRquired: required,
    isDisabled: disabled,
    isReadOnly: readonly,
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
      {label && (
        <Label as="span" required={required} {...labelProps}>
          {label}
        </Label>
      )}
      <Box
        role="presentation"
        __baseCSS={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          gap: 2,
        }}
        css={styles.group}
      >
        <CheckboxGroupContext.Provider value={{ variant, size, ...state }}>
          {children}
        </CheckboxGroupContext.Provider>
      </Box>
    </Box>
  );
};
