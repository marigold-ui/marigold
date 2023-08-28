import { ReactNode } from 'react';

import {
  TextAlignProp,
  cn,
  createVar,
  get,
  textAlign,
  useClassNames,
  useTheme,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface HeadlineProps extends HtmlProps<'h1'>, TextAlignProp {
  children?: ReactNode;
  level?: '1' | '2' | '3' | '4' | '5' | '6';
  color?: string;
  variant?: string;
  size?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// Component
// ---------------
export const Headline = ({
  children,
  variant,
  size,
  align = 'left',
  color,
  level = '1',
  as = `h${level}`,
  ...props
}: HeadlineProps) => {
  const theme = useTheme();
  const classNames = useClassNames({
    component: 'Headline',
    variant,
    size: size ?? `level-${level}`,
  });

  const Component = as;

  return (
    <Component
      {...props}
      className={cn(classNames, 'text-[--color]', textAlign[align])}
      style={createVar({
        color:
          color &&
          theme.colors &&
          get(theme.colors, color.replace('-', '.'), color /* fallback */),
      })}
    >
      {children}
    </Component>
  );
};
