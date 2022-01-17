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
export type SliderProps = {
  variant?: string;
} & ComponentProps<'input'>;

// Component
// ---------------
export const Slider: React.FC<SliderProps> = ({
  variant = '',
  className,
  ...props
}) => (
  <Box
    as="input"
    type="range"
    css={{ verticalAlign: 'middle' }}
    variant={`slider.${variant}`}
    className={className}
    {...props}
  />
);
