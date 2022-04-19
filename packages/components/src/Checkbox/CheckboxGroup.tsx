import React, { createContext, ReactNode } from 'react';
import { useCheckboxGroup } from '@react-aria/checkbox';
import {
  CheckboxGroupState,
  useCheckboxGroupState,
} from '@react-stately/checkbox';

import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Label } from '../Field/Label';

// Context
// ---------------
export const CheckboxGroupContext = createContext<CheckboxGroupState>(
  null as any
);

// Theme Extension
// ---------------

// Props
// ---------------
interface CheckboxGroupProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  children?: ReactNode;
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

  return (
    <Box {...groupProps}>
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
          gap: 4,
        }}
      >
        <CheckboxGroupContext.Provider value={state}>
          {children}
        </CheckboxGroupContext.Provider>
      </Box>
    </Box>
  );
};
