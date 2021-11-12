import React from 'react';
import { Element } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

export type SVGProps = {
  variant?: string;
  size?: number;
  title?: string; // For Testing
} & ComponentProps<'svg'>;

export const SVG: React.FC<SVGProps> = ({
  variant = 'icon',
  size = 24,
  className,
  children,
  ...props
}) => (
  <Element
    as="svg"
    variant={`icon.${variant}`}
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="currentcolor"
    {...props}
  >
    {children}
  </Element>
);
