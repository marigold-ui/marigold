import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export type SliderProps = {
  variant?: string;
} & ComponentProps<'input'>;

export const Slider: React.FC<SliderProps> = ({
  variant = 'default',
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
