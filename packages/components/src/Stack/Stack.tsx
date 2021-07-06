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

const ALIGN_STYLES = {
  left: {
    display: 'block',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
};

export const Stack: React.FC<StackProps> = ({
  space = 0,
  align = 'left',
  children,
  ...props
}) => {
  const stackItems = flattenChildren(children);
  const { display, flexDirection, alignItems } = ALIGN_STYLES[align];

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
