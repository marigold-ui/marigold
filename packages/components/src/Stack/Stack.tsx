import React from 'react';
import { ResponsiveStyleValue, useClassname } from '@marigold/system';

import { Box } from '../Box';

export type StackProps = {
  className?: string;
  space?: ResponsiveStyleValue<string>;
  align?: 'left' | 'right' | 'center';
  title?: string; // For Testing
};

const ALIGNMENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Stack: React.FC<StackProps> = ({
  space = 'none',
  align = 'left',
  children,
  ...props
}) => {
  const className = useClassname({ '> * + *': { pt: space } });
  return (
    <Box
      {...props}
      display="flex"
      flexDirection="column"
      alignItems={ALIGNMENT[align]}
      className={className}
    >
      {children}
    </Box>
  );
};
