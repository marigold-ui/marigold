import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export type SliderProps = {
  variant?: string;
} & ComponentProps<'input'>;

export const Slider: React.FC<SliderProps> = ({
  variant = 'default',
  className,
  ...props
}) => {
  const classNames = useStyles({
    css: {
      verticalAlign: 'middle',
    },
    className,
  });

  return (
    <Box
      as="input"
      type="range"
      variant={`slider.${variant}`}
      className={classNames}
      {...props}
    />
  );
};
