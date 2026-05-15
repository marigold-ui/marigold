import type { ReactNode } from 'react';
import { JSX } from 'react';
import type RAC from 'react-aria-components';
import { Text } from 'react-aria-components/Text';
import {
  CursorProp,
  FontSizeProp,
  FontStyleProp,
  FontWeightProp,
  LineHeightProp,
  TextAlignProp,
  TextWrapProp,
  WhiteSpaceProps,
  cn,
  cursorStyle,
  ensureCssVar,
  fontWeight,
  textAlign,
  textSize,
  textStyle,
  textWrap,
  lineHeight as twLineHeight,
  whiteSpace as twWhiteSpace,
  useClassNames,
} from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';

/**
 * The shared body-text variant scale. Reused by `Description` so body
 * primitives share one variant vocabulary. Will become a typography
 * token in a future PR.
 */
export type TextVariant = 'default' | 'muted';

/**
 * The shared body-text size scale. Derived from the `textSize` style-prop
 * record in `@marigold/system` so the two stay in lockstep. Other body
 * primitives derive their size unions from this via `Extract<TextSize, ...>`.
 * Will become a typography token in a future PR.
 */
export type TextSize = 'default' | keyof typeof textSize;

// Props
// --------------
type RemovedProps =
  | 'elementType'
  | 'slot'
  | keyof JSX.IntrinsicElements['div']
  | keyof JSX.IntrinsicElements['span']
  | keyof JSX.IntrinsicElements['p'];

export interface TextProps
  extends
    AriaLabelingProps,
    Omit<RAC.TextProps, RemovedProps>,
    SlotProps,
    TextAlignProp,
    FontSizeProp,
    FontWeightProp,
    FontStyleProp,
    LineHeightProp,
    CursorProp,
    TextWrapProp,
    WhiteSpaceProps {
  /**
   * The children of the component
   */
  children?: ReactNode;
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
  variant?: TextVariant | (string & {});
  size?: TextSize | (string & {});
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
  lineHeight,
  wrap,
  whiteSpace,
  children,
  as = 'div',
  slot,
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
  const Component = slot ? Text : as;
  const elementType = slot ? { elementType: as } : {};

  return (
    // `slot` may be `null` (opt out of inherited slot context). RAC's
    // `TextProps` narrows slot to `string`; `useContextProps` accepts `null`
    // at runtime. For the non-RAC branch (`as`), null also collapses to no
    // slot at the DOM level.
    <Component
      {...props}
      slot={slot as string | undefined}
      {...elementType}
      className={cn(
        'max-w-(--maxTextWidth)', // possibly set by a <Container>
        classNames,
        fontStyle && textStyle[fontStyle],
        align && textAlign[align],
        cursor && cursorStyle[cursor],
        weight && fontWeight[weight],
        fontSize && textSize[fontSize],
        lineHeight && twLineHeight[lineHeight],
        wrap && textWrap[wrap],
        whiteSpace && twWhiteSpace[whiteSpace]
      )}
      style={{ color: color && ensureCssVar(color, 'color') }}
    >
      {children}
    </Component>
  );
};

export { _Text as Text };
