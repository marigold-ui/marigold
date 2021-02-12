import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Box } from '../Box';

type ColumnsProps = {
  space?: 0 | 4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 88;
  // align?: 'left' | 'right' | 'center';
};

export const Columns = system<ColumnsProps, 'div'>(
  ({
    space = 0,
    // align = 'left',
    className,
    children,
    ...props
  }) => {
    const classNames = useStyles({}, className);

    let display = 'flex';
    let flexDirection = 'row';
    // let alignItems = 'flex-start';

    // if (align === 'left') {
    //   display = 'flex';
    //   flexDirection = 'row';
    //   alignItems = 'flex-start';
    // }

    return (
      <Box
        p={space}
        display={display}
        flexDirection={flexDirection}
        maxWidth="100%"
        className={classNames}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          let marginLeft = index === 0 ? -space : 0;

          return React.cloneElement(child as React.ReactElement<any>, {
            className: useStyles({ pl: space, ml: marginLeft }),
          });
          // return (
          //   <Box
          //     key={index.toString()}
          //     display={display}
          //     flexDirection={flexDirection}
          //     // alignItems={alignItems}
          //     pl={space}
          //     ml={index === 0 ? -space : 0}
          //     width="33%"
          //   >
          //     {child}
          //   </Box>
          // );
        })}
      </Box>
    );
  }
);
