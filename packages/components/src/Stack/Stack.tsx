import React, { Children } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

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
}) => (
  <Box
    {...props}
    as={as}
    display="flex"
    flexDirection="column"
    alignItems={ALIGNMENT[align]}
    css={{ '> * + *': { pt: space } }}
  >
    {Children.map(
      flattenChildren(children) as unknown as React.ReactElement,
      (child: React.ReactElement) => {
        if (as === 'div') {
          return (
            <Box>{React.cloneElement(child, {}, child.props.children)}</Box>
          );
        }
        return React.cloneElement(child, {}, child.props.children);
      }
    )}
  </Box>
);
