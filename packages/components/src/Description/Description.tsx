import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components';
import { ensureCssVar, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';

type RemovedProps = 'className' | 'style' | 'elementType';

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
   * The variant of the description.
   */
  variant?: 'default' | 'muted' | (string & {});
  /**
   * The size of the description.
   */
  size?: 'default' | 'xs' | 'sm' | 'base' | 'lg' | (string & {});
  /**
   * Set the text color.
   */
  color?: string;
  /**
   * The element id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

const _Description = ({
  as = 'p',
  slot = 'description',
  variant,
  size,
  color,
  children,
  ref,
  ...rest
}: DescriptionProps) => {
  const classNames = useClassNames({
    component: 'Description',
    variant,
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
