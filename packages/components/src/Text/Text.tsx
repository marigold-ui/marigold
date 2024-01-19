import {
  CursorProp,
  FontSizeProp,
  FontStyleProp,
  FontWeightProp,
  TextAlignProp,
  cn,
  createVar,
  cursorStyle,
  fontWeight,
  getColor,
  textAlign,
  textSize,
  textStyle,
  useClassNames,
  useTheme,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface TextProps
  extends Omit<HtmlProps<'p'>, 'className'>,
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
        color: color && getColor(theme, color, color /* fallback */),
      })}
    >
      {children}
    </p>
  );
};
