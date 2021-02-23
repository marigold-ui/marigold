import React from 'react';
import { useStyles, system } from '@marigold/system';

export type SliderProps = {
  variant?: string;
};

export const Slider = system<SliderProps, 'input'>(
  ({ variant = 'slider', className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `form.${variant}`,
        verticalAlign: 'middle',
      },
      className
    );

    return <input type="range" className={classNames} {...props} />;
  }
);
