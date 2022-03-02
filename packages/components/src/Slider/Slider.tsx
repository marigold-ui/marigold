import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface SliderThemeExtension<Value> {
  slider?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface SliderProps extends ComponentProps<'input'> {
  variant?: string;
}

// Component
// ---------------
export const Slider: React.FC<SliderProps> = ({ variant = '', ...props }) => (
  <Box
    as="input"
    type="range"
    css={{ verticalAlign: 'middle' }}
    variant={`slider.${variant}`}
    {...props}
  />
);
