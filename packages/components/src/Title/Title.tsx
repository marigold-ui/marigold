import {
  type ElementType,
  type ReactNode,
  type Ref,
  createElement,
} from 'react';
import {
  Heading,
  HeadingContext,
  type HeadingProps,
} from 'react-aria-components/Heading';
import { useContextProps } from 'react-aria-components/slots';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';
import { noSlot } from '../utils/noSlot';

// Marigold's `<Title>` reads `as` from its `HeadingContext` slot config so
// the title text can render as a non-heading element when nested in a
// container that already provides heading semantics (e.g. inside the
// disclosure `<button>` of `Panel.CollapsibleHeader`, where nesting a real
// heading element would be invalid HTML). Declaration-merging `HeadingProps`
// keeps the extension typed once at the slot layer; Provider/consumer sites
// don't redefine or re-cast it. Has no runtime effect on RAC's `<Heading>`.
declare module 'react-aria-components' {
  interface HeadingProps {
    as?: 'span' | (string & {});
  }
}

export interface TitleProps extends AriaLabelingProps, SlotProps {
  /**
   * The heading level (h1–h6), as a number or its string form. Can also be
   * supplied via slot context.
   * @default 2
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * The element id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

const _Title = ({ ref: refProp, ...inputProps }: TitleProps) => {
  const [merged, ref] = useContextProps(
    // Title's local props are a subset of `HeadingProps`; the cast bridges
    // the narrower `ref` (`HTMLHeadingElement`) that `HeadingContext`
    // expects. The `as` slot key is part of `HeadingProps` via the
    // declaration merge above, so no extra widening is needed here.
    { slot: 'title', ...inputProps } as HeadingProps,
    refProp,
    HeadingContext
  );
  // `slot` is consumed by `useContextProps` above; we drop it so the spread
  // below cannot reintroduce it on the rendered element.
  const { level = 2, slot: _slot, children, as, ...props } = merged;

  if (as) {
    // Render the dynamic element via `createElement` rather than a
    // capitalized JSX component variable, which would otherwise trip
    // `@eslint-react/static-components` for creating a component during render.
    return createElement(as as ElementType, { ref, ...props }, children);
  }

  return (
    // Pass `slot={noSlot}` so the underlying `<Heading>` does not re-consume
    // the same slot config we already merged via `useContextProps`, which
    // would otherwise duplicate the slot's `className` on the rendered DOM.
    <Heading
      level={Number(level)}
      slot={noSlot}
      {...props}
      // Safe: this branch only runs when `as` is unset, so the element
      // under the ref is always an `<hN>`. Title's public ref is the wider
      // `Ref<HTMLElement>` because the `as` slot config can render a span.
      ref={ref as unknown as Ref<HTMLHeadingElement>}
    >
      {children}
    </Heading>
  );
};

export { _Title as Title };
