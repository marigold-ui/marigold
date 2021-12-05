import React, { Children } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import { ResponsiveStyleValue } from '@marigold/system';

import { Box } from '../Box';

export type InlineProps = {
  as?: 'div' | 'span';
  space?: ResponsiveStyleValue<string>;
  align?: 'top' | 'center' | 'bottom';
};

const ALIGNMENT = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export const Inline: React.FC<InlineProps> = ({
  as = 'div',
  space = 'none',
  align = 'top',
  children,
  ...props
}) => (
  <Box
    as={as}
    display="inline-flex"
    css={{ '> * + *': { pl: space } }}
    alignItems={ALIGNMENT[align]}
    {...props}
  >
    {Children.map(
      flattenChildren(children) as unknown as React.ReactElement,
      (child: React.ReactElement) => (
        <Box>{React.cloneElement(child, {}, child.props.children)}</Box>
      )
    )}
  </Box>
);
