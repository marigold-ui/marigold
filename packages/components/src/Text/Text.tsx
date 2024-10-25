import { Text } from 'react-aria-components';
import type RAC from 'react-aria-components';
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
import type { AriaLabelingProps } from '@marigold/types';

// Props
// ---------------
export interface TextProps
  extends AriaLabelingProps,
    Omit<RAC.TextProps, 'elementType'>,
    TextAlignProp,
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
  /**
   * Element to render
   * @default "div"
   */
  as?: 'div' | 'p' | 'span';
  variant?: string;
  size?: string;
}

// Component
// ---------------
const _Text = ({
  variant,
  size,
  color,
  align,
  cursor,
  weight,
  fontSize,
  fontStyle,
  children,
  as = 'div',
  ...props
}: TextProps) => {
  const theme = useTheme();
  const classNames = useClassNames({
    component: 'Text',
    variant,
    size,
  });

  const Component = as;

  if (props.slot) {
    return (
      <Text
        {...props}
        elementType={as}
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
      </Text>
    );
  }

  return (
    <Component
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
    </Component>
  );
};

export { _Text as Text };
