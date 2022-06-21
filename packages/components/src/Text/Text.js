import React from 'react';
import { useComponentStyles } from '@marigold/system';
import { Box } from '@marigold/system';
// Component
// ---------------
export const Text = ({
  variant,
  size,
  align,
  color,
  fontSize,
  cursor,
  outline,
  children,
  ...props
}) => {
  const styles = useComponentStyles('Text', {
    variant,
    size,
  });
  return React.createElement(
    Box,
    {
      as: 'p',
      ...props,
      css: { color, cursor, outline, fontSize, textAlign: align, ...styles },
    },
    children
  );
};
//# sourceMappingURL=Text.js.map
