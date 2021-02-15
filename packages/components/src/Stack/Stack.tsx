import React from 'react';
import { system } from '@marigold/system';
import { Box } from '../Box';
import flattenChildren from 'react-flatten-children';
import { Theme } from '@marigold/system';

type StackProps = {
  space?: Theme['space'];
  align?: 'left' | 'right' | 'center';
};

export const Stack = system<StackProps, 'div'>(
  ({ space = 0, align = 'left', className, children, ...props }) => {
    let stackItems = flattenChildren(children);
    let spaceValue: number = +space;
    let display = 'flex';
    let flexDirection = 'column';
    let alignItems = align === 'right' ? 'flex-end' : 'center';

    if (align === 'left') {
      display = 'block';
      flexDirection = 'row';
      alignItems = 'flex-start';
    }

    return (
      <Box
        p={spaceValue}
        display={display}
        flexDirection={flexDirection}
        className={className}
        {...props}
      >
        {stackItems.map((child, index) => {
          return (
            <React.Fragment key={index}>
              <Box
                display={display}
                flexDirection={flexDirection}
                alignItems={alignItems}
                pt={spaceValue}
                mt={index === 0 ? -spaceValue : 0}
              >
                {child}
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    );
  }
);
