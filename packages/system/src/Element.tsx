import { ElementType, forwardRef } from 'react';
import { jsx } from '@emotion/react';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { reset } from './reset';
import { CSSObject } from './types';
import { useTheme } from './useTheme';

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
      const { css } = useTheme();

      /**
       * Get reset styles. Base is always applied. An additional reset maybe applied
       * based on the passed element.
       */
      const baseStyles = reset.base;
      const resetStyles =
        typeof element === 'string'
          ? (reset as object as { [key: string]: string })[element]
          : {};

      // 🤫 https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
      // lodash.isEmpty is too much KBs!
      const isEmpty = (val: any) =>
        val && Object.keys(val).length === 0 && val.constructor === Object;

      /**
       * Get variant styles (from theme).
       */
      const variants = Array.isArray(variant)
        ? variant.map(v => ({ variant: v }))
        : [{ variant }];
      const variantStyles = variants.map(variant => {
        return isEmpty(css(variant)) ? {} : css(variant);
      });
      const variantStyleObject = Object.assign({}, ...variantStyles);

      return jsx(
        as,
        {
          ...props,
          css: {
            ...baseStyles,
            ...resetStyles,
            ...variantStyleObject,
            ...css(styles),
          },
          ref,
          className: className,
        },
        children
      );
    }
  );
