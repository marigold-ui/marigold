import React from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export type StackProps = {
  as?: 'div' | 'ul' | 'ol';
  space?: ResponsiveStyleValue<string>;
  align?: 'left' | 'right' | 'center';
};

const ALIGNMENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Stack: React.FC<StackProps> = ({
  as = 'div',
  space = 'none',
  align = 'left',
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      as={as}
      display="flex"
      flexDirection="column"
      alignItems={ALIGNMENT[align]}
      css={{ '> * + *': { pt: space } }}
    >
      {children}
    </Box>
  );
};
