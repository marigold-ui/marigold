import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components';
import type { AriaLabelingProps } from '@marigold/types';

type RemovedProps = 'className' | 'style' | 'elementType';

export interface TextValueProps
  extends Omit<RAC.TextProps, RemovedProps>, AriaLabelingProps {
  /**
   * The element type to render.
   * @default 'span'
   */
  as?: 'div' | 'p' | 'span';
  /**
   * A slot name. Slots allow the component to receive props from a parent.
   * @default 'label'
   */
  slot?: string;
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
  ...rest
}: TextValueProps) => (
  <Text elementType={as} slot={slot} ref={ref} {...rest}>
    {children}
  </Text>
);

export { _TextValue as TextValue };
