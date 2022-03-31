import { jsx } from '@emotion/react';
import { ComponentProps } from '@marigold/types';

import { getNormalizedStyles } from './normalize';
import { useTheme } from './useTheme';

const normalizedStyles = getNormalizedStyles('svg');

// Make sure that numbered values are converted to px.
const toDimension = (value: number | string | number[] | string[]) =>
  Array.isArray(value)
    ? value.map(ensureNumberOrToken)
    : ensureNumberOrToken(value);
const ensureNumberOrToken = (value: number | string) =>
  typeof value === 'string' && /[0-9]+/.test(value) ? Number(value) : value;

export interface SVGProps extends ComponentProps<'svg'> {
  size?: number | string | number[] | string[];
}

export const SVG = ({
  size = 24,
  fill = 'currentcolor',
  children,
  ...props
}: SVGProps) => {
  const { css } = useTheme();

  return jsx(
    'svg',
    {
      viewBox: '0 0 24 24',
      css: css({
        ...normalizedStyles,
        fill,
        width: toDimension(props.width || size),
        height: toDimension(props.height || size),
      }),
      ...props,
    },
    children
  );
};
