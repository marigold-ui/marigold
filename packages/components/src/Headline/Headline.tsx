import { Heading } from 'react-aria-components';
import type RAC from 'react-aria-components';

import {
  TextAlignProp,
  cn,
  createVar,
  getColor,
  textAlign,
  useClassNames,
  useTheme,
} from '@marigold/system';

type RemovedProps = 'className' | 'level';
export interface HeadlineProps
  extends Omit<RAC.HeadingProps, RemovedProps>,
    TextAlignProp {
  /**
   * Set the color of the headline.
   */
  color?: string;
  variant?: string;
  size?: string;
  /**
   * Set a different level from theme, values are from 1 - 6.
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6' | RAC.HeadingProps['level'];
}

const _Headline = ({
  variant,
  size,
  children,
  align = 'left',
  color,
  level = 1,
  ...props
}: HeadlineProps) => {
  const theme = useTheme();
  const classNames = useClassNames({
    component: 'Headline',
    variant,
    size: size ?? `level-${level}`,
  });

  return (
    <Heading
      level={Number(level)}
      {...props}
      className={cn(classNames, 'text-[--color]', textAlign[align])}
      style={createVar({
        color: color && getColor(theme, color, color /* fallback */),
      })}
    >
      {children}
    </Heading>
  );
};

export { _Headline as Headline };
