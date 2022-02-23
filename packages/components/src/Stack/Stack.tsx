import React, { Children } from 'react';
import { ResponsiveStyleValue } from '@marigold/system';

import { flattenChildren } from '../utils';
import { Box } from '../Box';

export interface StackProps {
  space?: ResponsiveStyleValue<string>;
  align?: 'left' | 'right' | 'center';
}

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
}) => (
  <Box
    {...props}
    display="flex"
    flexDirection="column"
    alignItems={ALIGNMENT[align]}
    css={{ '> * + *': { pt: space } }}
  >
    {Children.map(
      flattenChildren(children) as unknown as React.ReactElement,
      (child: React.ReactElement) => (
        <Box>{React.cloneElement(child, {}, child.props.children)}</Box>
      )
    )}
  </Box>
);
