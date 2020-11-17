import React from 'react';
import { createStyles, system } from '@marigold/system';

type SliderProps = {
  variant?: string;
};

const useStyles = createStyles('form');

export const Slider = system<SliderProps, 'input'>(
  ({ variant = 'slider', ...props }) => {
    const classNames = useStyles({ variant, verticalAlign: 'middle' });

    return <input type="range" className={classNames} {...props} />;
  }
);
