import type { ElementType, ReactNode, Ref } from 'react';
import {
  Heading,
  HeadingContext,
  useContextProps,
} from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';

export interface TitleProps extends AriaLabelingProps, SlotProps {
  /**
   * The heading level (h1–h6). Can also be supplied via slot context.
   * Ignored when `as` is set.
   * @default 2
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * The element id.
   */
  id?: string;
  /**
   * Render as an alternate element instead of `<Heading>`. Useful when the
   * title text lives inside a container that already provides heading
   * semantics (e.g. a Disclosure trigger button). Can also be supplied via
   * slot context.
   */
  as?: 'span' | (string & {});
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

const _Title = ({ ref: refProp, ...inputProps }: TitleProps) => {
  const [merged, ref] = useContextProps(
    { slot: 'title', ...inputProps } as TitleProps,
    refProp,
    HeadingContext
  );
  const { level = 2, slot, children, as, ...props } = merged;

  if (as) {
    const Element = as as ElementType;
    return (
      <Element slot={slot as string | undefined} ref={ref} {...props}>
        {children}
      </Element>
    );
  }

  return (
    // `slot` may be `null` (opt out of inherited slot context). RAC's
    // `HeadingProps` extends `HTMLAttributes` which narrows slot to `string`,
    // but `useContextProps` accepts `null` at runtime — see SlotProps.
    <Heading
      level={level}
      slot={slot as string | undefined}
      {...props}
      ref={ref as unknown as Ref<HTMLHeadingElement>}
    >
      {children}
    </Heading>
  );
};

export { _Title as Title };
