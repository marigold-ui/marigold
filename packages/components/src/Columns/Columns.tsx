import React, { Children } from 'react';
import { useStyles } from '@marigold/system';
import { Box } from '../Box';
import flattenChildren from 'react-keyed-flatten-children';

type ColumnsProps = {
  className?: string;
  space?: number;
  horizontalAlign?: 'left' | 'right' | 'center';
  verticalAlign?: 'top' | 'bottom' | 'center';
  title?: string; // Should only be used for testing.
};

export const Columns: React.FC<ColumnsProps> = ({
  space = 0,
  horizontalAlign = 'left',
  verticalAlign = 'top',
  className,
  children,
  ...props
}) => {
  let columnItems = flattenChildren(children);
  let childClassNames = useStyles({ css: { p: `${space / 2}px` } });

  // horizontal Alignment
  let justify = 'flex-start';
  if (horizontalAlign === 'right') {
    justify = 'flex-end';
  } else if (horizontalAlign === 'center') {
    justify = 'center';
  }

  // vertical Alignment
  let alignItems = 'flex-start';
  if (verticalAlign === 'bottom') {
    alignItems = 'flex-end';
  } else if (verticalAlign === 'center') {
    alignItems = 'center';
  }

  return (
    <Box p={`${space}px`} display="flex" className={className}>
      <Box
        width={`calc(100% + ${space}px)`}
        m={`${-space / 2}px`}
        display="flex"
        flexWrap="wrap"
        alignItems={alignItems}
        justifyContent={justify}
        {...props}
      >
        {Children.map(
          columnItems as unknown as React.ReactElement,
          (child: React.ReactElement) => {
            return React.cloneElement(
              child,
              {
                className: childClassNames,
              },
              <Box className={child && child.props.className}>
                {child.props.children}
              </Box>
            );
          }
        )}
      </Box>
    </Box>
  );
};
