import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Box } from '../Box';

type ColumnsProps = {
  space?: 0 | 12 | 24;
  horizontalAlign?: 'left' | 'right' | 'center';
  verticalAlign?: 'top' | 'bottom' | 'center';
};

export const Columns = system<ColumnsProps, 'div'>(
  ({
    space = 0,
    horizontalAlign = 'left',
    verticalAlign = 'top',
    className,
    children,
    ...props
  }) => {
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
      <Box p={space} display="flex" className={className}>
        <Box
          width={`calc(100% + ${space}px)`}
          m={`${-(space / 2)}px`}
          display="flex"
          flexWrap="wrap"
          alignItems={alignItems}
          justifyContent={justify}
          {...props}
        >
          {React.Children.map(
            children as React.ReactElement,
            (child: React.ReactElement) => {
              return React.cloneElement(
                child,
                {
                  className: useStyles({ p: `${space / 2}px` }),
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
  }
);
