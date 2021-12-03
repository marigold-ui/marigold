import React, { Children } from 'react';
import { Box } from '../Box';
import flattenChildren from 'react-keyed-flatten-children';
import { ResponsiveStyleValue, useTheme } from '@marigold/system';

type ColumnsProps = {
  className?: string;
  space?: ResponsiveStyleValue<string>;
  horizontalAlign?: 'left' | 'right' | 'center';
  verticalAlign?: 'top' | 'bottom' | 'center';
};

const useAlignment = (direction: string) => {
  switch (direction) {
    case 'right':
      return 'flex-end';
    case 'bottom':
      return 'flex-end';
    case 'center':
      return 'center';
  }
  return 'flex-start';
};

export const Columns: React.FC<ColumnsProps> = ({
  space = 'none',
  horizontalAlign = 'left',
  verticalAlign = 'top',
  className,
  children,
  ...props
}) => {
  const justifyContent = useAlignment(horizontalAlign);
  const alignItems = useAlignment(verticalAlign);

  /**
   * transform space string to space value from theme
   */
  const { css } = useTheme();
  const spaceObject = css({ space }) as Object;
  const spaceValue = Object.values(spaceObject)[0];

  return (
    <Box p={space} display="flex" className={className}>
      <Box
        width={`calc(100% + ${spaceValue}px)`}
        m={`${-spaceValue / 2}px`}
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
              <Box css={{ p: `${spaceValue / 2}px` }}>
                {child.props.children}
              </Box>
            );
          }
        )}
      </Box>
    </Box>
  );
};
