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
import type { SlotProps } from '../types';

/**
 * The shared heading size scale. Reused by `Title` so heading primitives
 * share one vocabulary. Will become a typography token in a future PR.
 */
export type HeadlineSize =
  | 'level-1'
  | 'level-2'
  | 'level-3'
  | 'level-4'
  | 'level-5'
  | 'level-6';

export interface HeadlineProps
  extends AriaLabelingProps, TextAlignProp, LineHeightProp, SlotProps {
  /**
   * Set the color of the headline.
   */
  color?: string;
  variant?: string;
  size?: HeadlineSize | (string & {});
  /**
   * Set a different level.
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

const _Headline = ({
  variant,
  size,
  children,
  align = 'left',
  color,
  level = '1',
  lineHeight,
  slot,
  ...props
}: HeadlineProps) => {
  const classNames = useClassNames({
    component: 'Headline',
    variant,
    size: size ?? `level-${level}`,
  });

  return (
    // `slot` may be `null` (opt out of inherited slot context). RAC's
    // `HeadingProps` narrows slot to `string`, but `useContextProps` (used
    // internally by `<Heading>`) accepts `null` at runtime.
    <Heading
      level={Number(level)}
      slot={slot as string | undefined}
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
