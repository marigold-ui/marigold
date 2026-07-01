import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components/Text';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';

type RemovedProps = 'className' | 'style' | 'elementType' | 'slot' | 'render';

export interface DescriptionProps
  extends Omit<RAC.TextProps, RemovedProps>, AriaLabelingProps, SlotProps {
  /**
   * The element id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

const _Description = ({
  slot = 'description',
  children,
  ref,
  ...props
}: DescriptionProps) => (
  // The element type is decided by the surrounding `TextContext` slot config
  // (`<p>` inside `<Panel.Header>`, `<span>` by RAC's default elsewhere).
  // The cast bridges `SlotProps['slot']` (`string | null`, where `null`
  // opts out of inherited slot context) to RAC's narrower `string |
  // undefined`; `useContextProps` inside `Text` accepts `null` at runtime.
  <Text slot={slot as string | undefined} ref={ref} {...props}>
    {children}
  </Text>
);

export { _Description as Description };
