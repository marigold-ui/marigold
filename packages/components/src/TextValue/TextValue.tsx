import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components/Text';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';

type RemovedProps = 'className' | 'style' | 'elementType' | 'slot';

export interface TextValueProps
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

const _TextValue = ({
  as = 'span',
  slot = 'label',
  children,
  ref,
  ...props
}: TextValueProps) => (
  // `slot` may be `null` (opt out of inherited slot context). RAC's
  // `TextProps` narrows slot to `string`, but `useContextProps` (used
  // internally by `<Text>`) accepts `null` at runtime.
  <Text elementType={as} slot={slot as string | undefined} ref={ref} {...props}>
    {children}
  </Text>
);

export { _TextValue as TextValue };
