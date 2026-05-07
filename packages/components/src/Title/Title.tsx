import type { ReactNode, Ref } from 'react';
import {
  Heading,
  HeadingContext,
  useContextProps,
} from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';

export interface TitleProps extends AriaLabelingProps {
  /**
   * The heading level (h1–h6). Can also be supplied via slot context.
   * @default 2
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * A slot name. Slots allow the component to receive props from a parent.
   * @default 'title'
   */
  slot?: string;
  /**
   * The element id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

const _Title = ({ ref: refProp, ...inputProps }: TitleProps) => {
  const [props, ref] = useContextProps(
    { slot: 'title', ...inputProps } as TitleProps,
    refProp,
    HeadingContext
  );
  const { level = 2, slot, children, ...rest } = props;
  return (
    <Heading level={level} slot={slot} ref={ref} {...rest}>
      {children}
    </Heading>
  );
};

export { _Title as Title };
