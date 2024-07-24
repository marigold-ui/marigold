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

// Props
// ---------------
export interface TextProps
  extends TextAlignProp,
    FontSizeProp,
    FontWeightProp,
    FontStyleProp,
    CursorProp {
  /**
   * The children of the component
   */
  children?: React.ReactNode;
  /**
   * Set the text color.
   * @default currentColor
   */
  color?: string;
  variant?: string;
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
        'text-[--color] outline-[--outline]',
        classNames,
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
