import { createElement, forwardRef } from 'react';
import { ComponentWithAs } from '@marigold/types';
import { useStyles } from '@marigold/system';

export type BoxProps = {
  className?: string;
  display?: string;
};

export const Box: ComponentWithAs<
  BoxProps,
  'div'
> = forwardRef(({ as = 'div', children, ...props }, ref) =>
  createElement(as, { ...props, ref }, children)
);
