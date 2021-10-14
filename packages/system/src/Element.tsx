/** @jsx jsx */
import { ElementType, forwardRef } from 'react';
import { css, jsx } from '@emotion/react';
import { useClassname } from './useClassname';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { CSSObject } from './types';

export type ElementOwnProps = {
  element?: ElementType;
  css?: Omit<CSSObject, 'variant' | 'element'> & {
    variant?: never;
    element?: never;
  };
  variant?: string | string[];
  className?: string;
};

export type ElementProps = PolymorphicPropsWithRef<ElementOwnProps, 'div'>;

export const Element: PolymorphicComponentWithRef<ElementOwnProps, 'div'> =
  forwardRef(
    (
      {
        as = 'div',
        element = as,
        css: styles = {},
        variant,
        children,
        className,
        ...props
      },
      ref
    ) => {
      /**
       * Get variant styles (from theme).
       */
      const variants = Array.isArray(variant)
        ? variant.map(v => ({ variant: v }))
        : [{ variant }];
      const variantStyles = css(...variants);
      const variantCn = useClassname(...variants);

      console.log(...variants);
      console.log(variantStyles);
      console.log(variantCn);
      // const cn = useStyles({
      //   element: as,
      // });
      return jsx(as, { ...props, ref, className: className }, children);
    }
  );
