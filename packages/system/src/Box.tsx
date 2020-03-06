// @ts-ignore
import { css } from '@theme-ui/css';
import pick from 'lodash.pick';
import { forwardRef, AllHTMLAttributes, Ref, ReactNode } from 'react';
import { SPACE_PROPS, SpacingProps } from './categories';
import { jsx } from './emotion';

type Tags = keyof JSX.IntrinsicElements;

type BoxOwnProps<Type extends Tags> = {
  /**
   * Overrides `LegacyRef` which can be a `string`, but its usage is deprecated.
   * See: https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
   */
  ref?: Ref<HTMLElement | null>;
  children?: ReactNode;
  as?: Type;
  css?: Object;
  themeSection?: string;
  variant?: string;
} & SpacingProps;

// prettier-ignore
export type BoxProps<Type extends Tags> = 
  BoxOwnProps<Type> &
  Omit<AllHTMLAttributes<HTMLElement>, keyof BoxOwnProps<any>>;

/**
 * Props that we have to remove (because they are not valid HTML attributes)
 * and want to process (for styling the component).
 */
const SKIP_PROPS = ['css', 'variant', 'themeSection', ...SPACE_PROPS];

/**
 * Gather styling related props (css, variant, space props, ...) and put them in a
 * single `css` prop for emotion. All gathered props will be passed to `@theme-ui/css`
 * before emotion will process them. This way CSS properties will interpolated based on
 * the given theme.
 */
const parseProps = (props: { [key: string]: any }) => {
  const next: any = {};

  // TODO: optimize loop such that the style props are picked
  //       within the loop (and remove lodash.pick!)
  for (let key in props) {
    if (SKIP_PROPS.includes(key)) continue;
    next[key] = props[key];
  }

  const styles = {
    ...props.css,
    ...pick(props, SPACE_PROPS),
  };

  const variant =
    props.themeSection &&
    props.variant &&
    `${props.themeSection}.${props.variant}`;

  next.css = (theme: any) => {
    return [
      { boxSizing: 'border-box', margin: 0, minWidth: 0 },
      css(styles)(theme),
      css({ variant })(theme),
    ];
  };

  return next;
};

export const Box = forwardRef(
  ({ as = 'div', children, ...rest }: BoxProps<any>, ref: Ref<HTMLElement>) => {
    const props = parseProps(rest);
    props.ref = ref;

    return jsx(as, props, children);
  }
) as <T extends Tags = 'div'>(props: BoxProps<T>) => JSX.Element | null;
