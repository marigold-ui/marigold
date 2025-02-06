import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { TextAlignProp, cn, textAlign, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';

export interface HeadlineProps extends AriaLabelingProps, TextAlignProp {
  /**
   * Set the color of the headline.
   */
  color?: string;
  variant?: string;
  size?: string;
  /**
   * Set a different level.
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Children of the component.
   */
  children?: ReactNode;
  /**
   * A slot to place the element in.
   */
  slot?: string;
}

const _Headline = ({
  variant,
  size,
  children,
  align = 'left',
  color,
  level = '1',
  ...props
}: HeadlineProps) => {
  const classNames = useClassNames({
    component: 'Headline',
    variant,
    size: size ?? `level-${level}`,
  });

  return (
    <Heading
      level={Number(level)}
      {...props}
      className={cn(classNames, 'text-(--color)', textAlign[align])}
      style={{ color: `var(--color-${color})` }}
    >
      {children}
    </Heading>
  );
};

export { _Headline as Headline };
