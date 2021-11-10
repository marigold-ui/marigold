import React, { forwardRef } from 'react';
import { CSSObject, Element, ResponsiveStyleValue } from '@marigold/system';
import {
  PolymorphicPropsWithRef,
  PolymorphicComponentWithRef,
} from '@marigold/types';

export type BoxOwnProps = {
  className?: string;
  variant?: string | string[];
  css?: CSSObject;

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
  zIndex?: ResponsiveStyleValue<number | string>;

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
  flexShrink?: ResponsiveStyleValue<number | string>;
  flexGrow?: ResponsiveStyleValue<number | string>;
  alignItems?: ResponsiveStyleValue<string>;
  justifyContent?: ResponsiveStyleValue<string>;

  bg?: ResponsiveStyleValue<number | string>;
  border?: ResponsiveStyleValue<number | string>;
  borderRadius?: ResponsiveStyleValue<number | string>;
  boxShadow?: ResponsiveStyleValue<number | string>;
  opacity?: ResponsiveStyleValue<number | string>;
  overflow?: ResponsiveStyleValue<string>;

  transition?: ResponsiveStyleValue<number | string>;
};

export type BoxProps = PolymorphicPropsWithRef<BoxOwnProps, 'div'>;

export const Box: PolymorphicComponentWithRef<BoxOwnProps, 'div'> = forwardRef(
  (
    {
      variant,
      as = 'div',
      css,
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
      border,
      borderRadius,
      boxShadow,
      opacity,
      overflow,
      transition,
      ...props
    },
    ref
  ) => (
    <Element
      as={as}
      ref={ref}
      variant={variant}
      css={{
        ...{
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
          border,
          borderRadius,
          boxShadow,
          opacity,
          overflow,
          transition,
        },
        ...css,
      }}
      className={className}
      {...props}
    >
      {children}
    </Element>
  )
);
