import React from 'react';
import { jsx } from '@emotion/react';
import { ComponentProps } from '@marigold/types';
import { getNormalizedStyles } from './normalize';
import { useTheme } from './useTheme';

const normalizedStyles = getNormalizedStyles('svg');

export interface SVGProps extends ComponentProps<'svg'> {
  size?: number;
}

export const SVG: React.FC<SVGProps> = ({
  size = 24,
  fill = 'currentcolor',
  children,
  ...props
}) => {
  const { css } = useTheme();

  return jsx(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      css: css({ fill: fill, ...normalizedStyles }),
      ...props,
    },
    children
  );
};
