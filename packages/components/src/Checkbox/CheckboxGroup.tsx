import React, { createContext } from 'react';
import { CheckboxGroupState } from '@react-stately/checkbox';

// Context
// ---------------
export const CheckboxGroupContext = createContext<CheckboxGroupState>(
  null as any
);
