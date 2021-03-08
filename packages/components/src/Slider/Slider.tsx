import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

export type SliderProps = {
  variant?: string;
} & ComponentProps<'input'>;

export const Slider: React.FC<SliderProps> = ({
  variant = 'slider',
  className,
  ...props
}) => {
  const classNames = useStyles(
    {
      variant: `form.${variant}`,
      verticalAlign: 'middle',
    },
    className
  );

  return <input type="range" className={classNames} {...props} />;
};
