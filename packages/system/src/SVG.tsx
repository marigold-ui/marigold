import React from 'react';
import { jsx } from '@emotion/react';
import { ComponentProps } from '@marigold/types';
import { getNormalizedStyles } from './normalize';

const css = getNormalizedStyles('svg');

export interface SVGProps extends ComponentProps<'svg'> {
  size?: number;
}

export const SVG: React.FC<SVGProps> = ({ size = 24, children, ...props }) =>
  jsx(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentcolor',
      ...props,
      css,
    },
    children
  );
