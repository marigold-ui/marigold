import { JSX } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components';
import {
  CursorProp,
  FontSizeProp,
  FontStyleProp,
  FontWeightProp,
  TextAlignProp,
  cn,
  cursorStyle,
  ensureCssVar,
  fontWeight,
  textAlign,
  textSize,
  textStyle,
  useClassNames,
} from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';

// Props
// --------------
type RemovedProps =
  | 'elementType'
  | keyof JSX.IntrinsicElements['div']
  | keyof JSX.IntrinsicElements['span']
  | keyof JSX.IntrinsicElements['p'];

export interface TextProps
  extends AriaLabelingProps,
    Omit<RAC.TextProps, RemovedProps>,
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
  /**
   *  A slot name for the component. Slots allow the component to receive props from a parent component.
   */
  slot?: string;
  variant?: 'default' | 'muted' | (string & {});
  size?:
    | 'default'
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
    | (string & {});
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
  const classNames = useClassNames({
    component: 'Text',
    variant,
    size,
  });

  /**
   * Use `<Text>` when a `slot` is used. Make sure `elementType`
   * prop is only used in combination the `<Text>`.
   */
  const Component = props.slot ? Text : as;
  const elementType = props.slot ? { elementType: as } : {};

  return (
    <Component
      {...props}
      {...elementType}
      className={cn(
        'max-w-(--maxTextWidth)', // possibly set by a <Container>
        classNames,
        fontStyle && textStyle[fontStyle],
        align && textAlign[align],
        cursor && cursorStyle[cursor],
        weight && fontWeight[weight],
        fontSize && textSize[fontSize]
      )}
      style={{ color: color && ensureCssVar(color, 'color') }}
    >
      {children}
    </Component>
  );
};

export { _Text as Text };
