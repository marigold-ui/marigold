import React, { Children, useEffect, useState } from 'react';
import { Box } from '../Box';
import flattenChildren from 'react-keyed-flatten-children';

type ColumnsProps = {
  className?: string;
  space?: number;
  horizontalAlign?: 'left' | 'right' | 'center';
  verticalAlign?: 'top' | 'bottom' | 'center';
};

const useAlignment = (direction: string) => {
  const [alignment, setAlignment] = useState('flex-start');
  useEffect(() => {
    switch (direction) {
      case 'right':
        setAlignment('flex-end');
        break;
      case 'bottom':
        setAlignment('flex-end');
        break;
      case 'center':
        setAlignment('center');
        break;
    }
  }, [direction]);

  return alignment;
};

export const Columns: React.FC<ColumnsProps> = ({
  space = 0,
  horizontalAlign = 'left',
  verticalAlign = 'top',
  className,
  children,
  ...props
}) => {
  const justifyContent = useAlignment(horizontalAlign);
  const alignItems = useAlignment(verticalAlign);

  return (
    <Box p={space} display="flex" className={className}>
      <Box
        width={`calc(100% + ${space}px)`}
        m={`${-space / 2}px`}
        display="flex"
        flexWrap="wrap"
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...props}
      >
        {Children.map(
          flattenChildren(children) as unknown as React.ReactElement,
          (child: React.ReactElement) => {
            return React.cloneElement(
              child,
              {},
              <Box css={{ p: `${space / 2}px` }}>{child.props.children}</Box>
            );
          }
        )}
      </Box>
    </Box>
  );
};
