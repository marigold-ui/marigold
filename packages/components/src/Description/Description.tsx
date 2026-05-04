import type { JSX, ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components';
import { ensureCssVar, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';
import type { TextSize } from '../Text/Text';

type RemovedProps =
  | 'elementType'
  | keyof JSX.IntrinsicElements['div']
  | keyof JSX.IntrinsicElements['span']
  | keyof JSX.IntrinsicElements['p'];

/**
 * The deliberate subset of `TextSize` that Description ships today.
 * Derived from `TextSize` so a future rename or removal in Text breaks
 * here at the type level instead of silently drifting.
 */
export type DescriptionSize = Extract<TextSize, 'xs' | 'sm' | 'base'>;

export interface DescriptionProps
  extends Omit<RAC.TextProps, RemovedProps>, AriaLabelingProps {
  /**
   * The element type to render.
   * @default 'p'
   */
  as?: 'div' | 'p' | 'span';
  /**
   * A slot name. Slots allow the component to receive props from a parent.
   * @default 'description'
   */
  slot?: string;
  /**
   * The size of the description.
   */
  size?: DescriptionSize | (string & {});
  /**
   * Set the text color.
   */
  color?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

const _Description = ({
  as = 'p',
  slot = 'description',
  size,
  color,
  children,
  ref,
  ...rest
}: DescriptionProps) => {
  const classNames = useClassNames({
    component: 'Description',
    size,
  });

  return (
    <Text
      elementType={as}
      slot={slot}
      ref={ref}
      className={classNames}
      style={{ color: color && ensureCssVar(color, 'color') }}
      {...rest}
    >
      {children}
    </Text>
  );
};

export { _Description as Description };
