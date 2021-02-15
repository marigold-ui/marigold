import React from 'react';
import { useTheme, system } from '@marigold/system';
import { Box } from '../Box';
import flattenChildren from 'react-flatten-children';

// const theme = useTheme();
// console.log(theme.space);
// console.log(`${theme.space}`);

type StackProps = {
  space?: 0 | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 88;
  align?: 'left' | 'right' | 'center';
};

export const Stack = system<StackProps, 'div'>(
  ({ space = 0, align = 'left', className, children, ...props }) => {
    const stackItems = flattenChildren(children);

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
        p={space}
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
                pt={space}
                mt={index === 0 ? -space : 0}
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
