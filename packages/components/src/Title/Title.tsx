import type { ReactNode, Ref } from 'react';
import { Heading, HeadingContext } from 'react-aria-components/Heading';
import { useContextProps } from 'react-aria-components/slots';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';

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
  ref?: Ref<HTMLHeadingElement>;
}

const _Title = ({ ref: refProp, ...inputProps }: TitleProps) => {
  const [merged, ref] = useContextProps(
    { slot: 'title', ...inputProps } as TitleProps,
    refProp,
    HeadingContext
  );
  const { level = 2, slot, children, ...props } = merged;
  return (
    // `slot` may be `null` (opt out of inherited slot context). RAC's
    // `HeadingProps` extends `HTMLAttributes` which narrows slot to `string`,
    // but `useContextProps` accepts `null` at runtime — see SlotProps.
    <Heading
      level={level}
      slot={slot as string | undefined}
      ref={ref}
      {...props}
    >
      {children}
    </Heading>
  );
};

export { _Title as Title };
