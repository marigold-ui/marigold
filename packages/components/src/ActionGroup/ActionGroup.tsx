import React, { Children } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import { ResponsiveStyleValue, useStyles } from '@marigold/system';
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
  const childClassName = useStyles(
    verticalAlignment
      ? { css: { marginBottom: space } }
      : { css: { marginRight: space } }
  );
  return (
    <Box variant={`actionGroup.${variant}`} className={className} {...props}>
      {Children.map(
        flattenChildren(children),
        (child, i) =>
          child !== null &&
          child !== undefined && (
            <Box
              as={verticalAlignment ? 'div' : 'span'}
              className={
                i < Children.count(children) - 1 ? childClassName : undefined
              }
            >
              {child}
            </Box>
          )
      )}
    </Box>
  );
};
