import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import {
  LineHeightProp,
  TextAlignProp,
  cn,
  ensureCssVar,
  textAlign,
  lineHeight as twLineHeight,
  useClassNames,
} from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';

export interface HeadlineProps
  extends AriaLabelingProps,
    TextAlignProp,
    LineHeightProp {
  /**
   * Set the color of the headline.
   */
  color?: string;
  variant?: string;
  size?:
    | 'level-1'
    | 'level-2'
    | 'level-3'
    | 'level-4'
    | 'level-5'
    | 'level-6'
    | (string & {});
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
  lineHeight,
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
      className={cn(
        classNames,
        'max-w-(--maxHeadlineWidth)', // possibly set by a <Container>
        textAlign[align],
        lineHeight && twLineHeight[lineHeight]
      )}
      style={{ color: color && ensureCssVar(color, 'color') }}
    >
      {children}
    </Heading>
  );
};

export { _Headline as Headline };
