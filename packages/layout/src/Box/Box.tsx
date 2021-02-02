import { createElement, forwardRef } from 'react';
import { ResponsiveStyleValue, useStyles } from '@marigold/system';
import { ComponentWithAs } from '@marigold/types';

export type BoxProps = {
  className?: string;

  display?: ResponsiveStyleValue<string>;

  height?: ResponsiveStyleValue<number | string>;
  width?: ResponsiveStyleValue<number | string>;
  minWidth?: ResponsiveStyleValue<number | string>;
  maxWidth?: ResponsiveStyleValue<number | string>;

  position?: ResponsiveStyleValue<string>;
  top?: ResponsiveStyleValue<number | string>;
  bottom?: ResponsiveStyleValue<number | string>;
  right?: ResponsiveStyleValue<number | string>;
  left?: ResponsiveStyleValue<number | string>;
  zIndex?: ResponsiveStyleValue<string>;

  p?: ResponsiveStyleValue<number | string>;
  px?: ResponsiveStyleValue<number | string>;
  py?: ResponsiveStyleValue<number | string>;
  pt?: ResponsiveStyleValue<number | string>;
  pb?: ResponsiveStyleValue<number | string>;
  pl?: ResponsiveStyleValue<number | string>;
  pr?: ResponsiveStyleValue<number | string>;

  m?: ResponsiveStyleValue<number | string>;
  mx?: ResponsiveStyleValue<number | string>;
  my?: ResponsiveStyleValue<number | string>;
  mt?: ResponsiveStyleValue<number | string>;
  mb?: ResponsiveStyleValue<number | string>;
  ml?: ResponsiveStyleValue<number | string>;
  mr?: ResponsiveStyleValue<number | string>;

  flexDirection?: ResponsiveStyleValue<string>;
  flexWrap?: ResponsiveStyleValue<string>;
  flexShrink?: ResponsiveStyleValue<string>;
  flexGrow?: ResponsiveStyleValue<string>;
  alignItems?: ResponsiveStyleValue<string>;
  justifyContent?: ResponsiveStyleValue<string>;

  bg?: ResponsiveStyleValue<number | string>;
  textAlign?: ResponsiveStyleValue<string>;
  border?: ResponsiveStyleValue<number | string>;
  borderRadius?: ResponsiveStyleValue<number | string>;
  boxShadow?: ResponsiveStyleValue<number | string>;
  opacity?: ResponsiveStyleValue<number | string>;
  overflow?: ResponsiveStyleValue<string>;
  transition?: ResponsiveStyleValue<number | string>;
  transform?: ResponsiveStyleValue<number | string>;
};

export const Box: ComponentWithAs<BoxProps, 'div'> = forwardRef(
  (
    {
      as = 'div',
      children,
      className,
      display,
      height,
      width,
      minWidth,
      maxWidth,
      position,
      top,
      bottom,
      right,
      left,
      zIndex,
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      flexDirection,
      flexWrap,
      flexShrink,
      flexGrow,
      alignItems,
      justifyContent,
      bg,
      textAlign,
      border,
      borderRadius,
      boxShadow,
      opacity,
      overflow,
      transition,
      transform,
      ...props
    },
    ref
  ) => {
    const cn = useStyles({ element: [as], classNames: className });
    return createElement(as, { ...props, ref, className: cn }, children);
  }
);
