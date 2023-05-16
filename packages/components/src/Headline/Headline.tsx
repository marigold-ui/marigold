import React, { ReactNode } from 'react';
import {
  Box,
  useClassNames,
  cn,
  createVar,
  TextAlignProp,
  textAlign,
  useTheme,
  get,
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
  ...props
}: HeadlineProps) => {
  const theme = useTheme();
  const classNames = useClassNames({
    component: 'Headline',
    variant,
    size: size ?? `level-${level}`,
  });

  return (
    <Box
      as={`h${level}`}
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
    </Box>
  );
};
