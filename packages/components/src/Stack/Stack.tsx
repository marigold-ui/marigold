import React, { Children } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';
import { Box } from '../Box';
import flattenChildren from 'react-keyed-flatten-children';

export type StackProps = {
  className?: string;
  space?: ResponsiveStyleValue<number | string>;
  align?: 'left' | 'right' | 'center';
  title?: string; // For Testing
};

export const Stack: React.FC<StackProps> = ({
  space = 0,
  align = 'left',
  children,
  ...props
}) => {
  let stackItems = flattenChildren(children);
  let display = 'flex';
  let flexDirection = 'column';
  let alignItems = align === 'right' ? 'flex-end' : 'center';
  if (align === 'left') {
    display = 'block';
    flexDirection = 'row';
    alignItems = 'flex-start';
  }

  return (
    <Box p={space} display={display} flexDirection={flexDirection} {...props}>
      {Children.map(stackItems, (child, index) => (
        <Box
          display={display}
          flexDirection={flexDirection}
          alignItems={alignItems}
          pt={space}
          mt={index === 0 ? -space! : 0}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};
