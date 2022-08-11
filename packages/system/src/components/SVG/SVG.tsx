import { forwardRef } from 'react';
import { jsx } from '@emotion/react';
import { ComponentProps } from '@marigold/types';
import { useTheme } from '../../hooks';
import { CSSObject } from '../../types';

// Make sure that numbered values are converted to px.
const toDimension = (value: number | string | number[] | string[]) =>
  Array.isArray(value)
    ? value.map(ensureNumberOrToken)
    : ensureNumberOrToken(value);
const ensureNumberOrToken = (value: number | string) =>
  typeof value === 'string' && /[0-9]+/.test(value) ? Number(value) : value;

export interface SVGProps extends ComponentProps<'svg'> {
  size?: number | string | number[] | string[];
  css?: CSSObject;
}

export const SVG = forwardRef<SVGElement, SVGProps>(
  (
    { size = 24, fill = 'currentcolor', children, css: styles, ...props },
    ref
  ) => {
    const { css } = useTheme();

    return jsx(
      'svg',
      {
        ...props,
        css: css({
          ...styles,
          fill,
          width: toDimension(props.width || size),
          height: toDimension(props.height || size),
        }),
        ref,
      },
      children
    );
  }
);
