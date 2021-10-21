import { jsx } from '@emotion/react';
import { forwardRef } from 'react';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

import { getNormalizedStyles } from './normalize';
import { CSSObject } from './types';
import { useTheme } from './useTheme';

export type ElementOwnProps = {
  css?: CSSObject;
  variant?: string | string[];
};

export type ElementProps = PolymorphicPropsWithRef<ElementOwnProps, 'div'>;

const isNotEmpty = (val: any) =>
  !(val && Object.keys(val).length === 0 && val.constructor === Object);

const baseStyles = getNormalizedStyles('base');

/**
 * Props that we have to remove and want to process to styling the component.
 */
const SKIP_PROPS = ['css', 'variant'];

export const Element: PolymorphicComponentWithRef<ElementOwnProps, 'div'> =
  forwardRef(
    ({ as = 'div', css: styles = {}, variant, children, ...props }, ref) => {
      const { css } = useTheme();

      // Die parseProps function habe ich noch nicht ganz verstanden.
      // Ich habe sie jetzt nämlich so gebaut, dass das Gleiche wie zuvor rauskommt.
      // so passiert ja aktuell nicht mehr als den return direkt in jsx() zu geben

      /**
       * Gather styling related props (css, variant, space props, ...) and put them in a
       * single `css` prop for emotion. All gathered props will be passed to `@theme-ui/css`
       * before emotion will process them. This way CSS properties will interpolated based on
       * the given theme.
       */
      const parseProps = (props: { [key: string]: any }) => {
        const next: any = {};

        // TODO: optimize loop such that the style props are picked
        // within the loop (and remove lodash.pick!)
        for (let key in props) {
          if (SKIP_PROPS.includes(key)) continue;
          next[key] = props[key];
        }

        /**
         * Transform variant input for `@theme-ui/css`
         */
        const variants = Array.isArray(variant)
          ? variant.map(v => ({ variant: v }))
          : [{ variant }];

        next.css = () => {
          return [
            baseStyles,
            getNormalizedStyles(as),
            ...variants.map(v => css(v)),
            css(styles),
          ].filter(isNotEmpty);
        };

        return next;
      };

      return jsx(as, { ...props, ...parseProps(props), ref }, children);
    }
  );
