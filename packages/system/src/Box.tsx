import { jsx } from '@emotion/core';
import {
  forwardRef,
  AllHTMLAttributes,
  PropsWithChildren,
  Ref,
  ReactElement,
} from 'react';

type Tags = keyof JSX.IntrinsicElements;

export type BoxProps<Type extends Tags> = PropsWithChildren<
  {
    /**
     * Overrides `LegacyRef` which can be a `string`, but its usage is deprecated.
     * See: https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
     */
    ref?: Ref<HTMLElement | null>;
    as?: Type;
    css?: Object;
  } & Omit<AllHTMLAttributes<HTMLElement>, 'as' | 'ref'>
>;

// Type alias to better digest <Box> signature for humans
type Box = <T extends Tags = 'div'>(
  props: BoxProps<T>
) => ReactElement<BoxProps<T>> | null;

export const Box = forwardRef(
  (
    { as = 'div', css = {}, children, ...props }: BoxProps<any>,
    ref: Ref<HTMLElement>
  ) => {
    return jsx(
      as,
      {
        ...props,
        ref,
        css: {
          boxSizing: 'border-box',
          margin: 0,
          minWidth: 0,
          ...(css as any),
        },
      },
      children
    );
  }
) as Box;
