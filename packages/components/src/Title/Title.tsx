import type { ElementType, ReactNode, Ref } from 'react';
import {
  Heading,
  HeadingContext,
  useContextProps,
} from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';
import { noSlot } from '../utils/noSlot';

export interface TitleProps extends AriaLabelingProps, SlotProps {
  /**
   * The heading level (h1–h6). Can also be supplied via slot context.
   * @default 2
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * The element id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

// Slot config may deliver an `as` override so the title text can render
// inside a container that already provides heading semantics (e.g. the
// disclosure `<button>` inside `Panel.CollapsibleHeader`, where nesting a
// real heading element would be invalid HTML).
type TitleSlotProps = TitleProps & { as?: 'span' | (string & {}) };

const _Title = ({ ref: refProp, ...inputProps }: TitleProps) => {
  const [merged, ref] = useContextProps(
    { slot: 'title', ...inputProps } as TitleSlotProps,
    refProp,
    HeadingContext
  );
  // `slot` is consumed by `useContextProps` above; we drop it so the spread
  // below cannot reintroduce it on the rendered element.
  const {
    level = 2,
    slot: _slot,
    children,
    as,
    ...props
  } = merged as TitleSlotProps;

  if (as) {
    const Element = as as ElementType;
    return (
      <Element ref={ref} {...props}>
        {children}
      </Element>
    );
  }

  return (
    // Pass `slot={noSlot}` so the underlying `<Heading>` does not re-consume
    // the same slot config we already merged via `useContextProps`, which
    // would otherwise duplicate the slot's `className` on the rendered DOM.
    <Heading
      level={level}
      slot={noSlot}
      {...props}
      ref={ref as unknown as Ref<HTMLHeadingElement>}
    >
      {children}
    </Heading>
  );
};

export { _Title as Title };
