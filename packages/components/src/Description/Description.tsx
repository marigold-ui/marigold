import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';

type RemovedProps = 'className' | 'style' | 'elementType' | 'slot';

export interface DescriptionProps
  extends Omit<RAC.TextProps, RemovedProps>, AriaLabelingProps, SlotProps {
  /**
   * The element type to render.
   * @default 'span'
   */
  as?: 'div' | 'p' | 'span';
  /**
   * The element id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

const _Description = ({
  as = 'span',
  slot = 'description',
  children,
  ref,
  ...props
}: DescriptionProps) => (
  // `slot` may be `null` (opt out of inherited slot context). RAC's
  // `TextProps` narrows slot to `string`, but `useContextProps` (used
  // internally by `<Text>`) accepts `null` at runtime.
  <Text elementType={as} slot={slot as string | undefined} ref={ref} {...props}>
    {children}
  </Text>
);

export { _Description as Description };
