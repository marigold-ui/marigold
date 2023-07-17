import React from 'react';
import {
  CursorProp,
  FontSizeProp,
  FontWeightProp,
  TextAlignProp,
  cn,
  createVar,
  cursorStyle,
  FontStyleProp,
  fontWeight,
  get,
  textAlign,
  useClassNames,
  useTheme,
  textSize,
  textStyle,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface TextProps
  extends HtmlProps<'p'>,
    TextAlignProp,
    FontSizeProp,
    FontWeightProp,
    FontStyleProp,
    CursorProp {
  children?: React.ReactNode;
  variant?: string;
  color?: string;
  size?: string;
}

// Component
// ---------------
export const Text = ({
  variant,
  size,
  color,
  align,
  cursor,
  weight,
  fontSize,
  fontStyle,
  children,
  ...props
}: TextProps) => {
  const theme = useTheme();
  const classNames = useClassNames({
    component: 'Text',
    variant,
    size,
  });

  return (
    <p
      {...props}
      className={cn(
        classNames,
        'text-[--color] outline-[--outline]',
        fontStyle && textStyle[fontStyle],
        align && textAlign[align],
        cursor && cursorStyle[cursor],
        weight && fontWeight[weight],
        fontSize && textSize[fontSize]
      )}
      style={createVar({
        color:
          color &&
          theme.colors &&
          get(theme.colors, color.replace('-', '.'), color /* fallback */),
      })}
    >
      {children}
    </p>
  );
};
