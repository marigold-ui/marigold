import { forwardRef, AllHTMLAttributes, PropsWithChildren, Ref } from 'react';
// @ts-ignore
import { css } from '@theme-ui/css';
import pick from 'lodash.pick';
import { jsx } from './emotion';
import { SpacingProps } from './types';

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
    themeSection?: string;
    variant?: string;
  } & SpacingProps &
    Omit<AllHTMLAttributes<HTMLElement>, 'as' | 'ref'>
>;

const SPACE_PROPS = [
  'm',
  'margin',
  'mt',
  'marginTop',
  'mr',
  'marginRight',
  'mb',
  'marginBottom',
  'ml',
  'marginLeft',
  'mx',
  'marginX',
  'my',
  'marginY',
  'p',
  'padding',
  'pt',
  'paddingTop',
  'pr',
  'paddingRight',
  'pb',
  'paddingBottom',
  'pl',
  'paddingLeft',
  'px',
  'paddingX',
  'py',
  'paddingY',
];

/**
 * Props that we are processing and not passed to `jsx`.
 */
const SKIP_PROPS = ['css', 'variant', 'themeSection', ...SPACE_PROPS];

/**
 * Parse `props` such that special props are stripped
 * (see `SKIP_PROPS`) and the `css` prop is decorated
 * to use `@theme-ui/css` before its handled by `emotion`.
 *
 * NOTE: Even though `props` is not an arbitrary index object,
 * we're beeing very generous with the typing here since
 * this is only a helper function that is used interally.
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
