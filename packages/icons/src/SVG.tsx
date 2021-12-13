import React from 'react';
import { ComponentProps } from '@marigold/types';

export type SVGProps = {
  size?: number;
} & ComponentProps<'svg'>;

export const SVG: React.FC<SVGProps> = ({ size = 24, children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentcolor"
    {...props}
  >
    {children}
  </svg>
);
