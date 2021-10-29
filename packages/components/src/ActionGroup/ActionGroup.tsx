import React, { Children } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import { ResponsiveStyleValue } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export type ActionGroupProps = {
  variant?: string;
  space?: ResponsiveStyleValue<number | string>;
  verticalAlignment?: boolean;
} & ComponentProps<'div'>;

export const ActionGroup: React.FC<ActionGroupProps> = ({
  variant = 'default',
  space = 'none',
  verticalAlignment = false,
  children,
  className,
  ...props
}) => {
  const childStyle = verticalAlignment
    ? { marginBottom: space }
    : { marginRight: space };
  return (
    <Box variant={`actionGroup.${variant}`} className={className} {...props}>
      {Children.map(
        flattenChildren(children),
        (child, i) =>
          child !== null &&
          child !== undefined && (
            <Box
              as={verticalAlignment ? 'div' : 'span'}
              css={i < Children.count(children) - 1 ? childStyle : undefined}
            >
              {child}
            </Box>
          )
      )}
    </Box>
  );
};
