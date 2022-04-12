import React from 'react';
import { ComponentProps } from '@marigold/types';
import { size as tokenSize } from '@marigold/tokens';

import { Box } from '../Box';

export interface ContainerProps extends ComponentProps<'div'> {
  contentType?: 'content' | 'header';
  size?: keyof typeof tokenSize.content | keyof typeof tokenSize.header;
  align?: 'left' | 'right' | 'center';
  alignContainer?: 'left' | 'right' | 'center';
}

const ALIGNMENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Container: React.FC<ContainerProps> = ({
  contentType = 'content',
  size = 'medium',
  align = 'left',
  alignContainer = 'left',
  children,
  ...props
}) => {
  const maxWidth = tokenSize[contentType][size];

  let gridTemplateColumns = `${maxWidth} 1fr 1fr`;
  let gridColumn = 1;
  if (alignContainer === 'center') {
    gridTemplateColumns = `1fr ${maxWidth} 1fr`;
    gridColumn = 2;
  }
  if (alignContainer === 'right') {
    gridTemplateColumns = `1fr 1fr ${maxWidth}`;
    gridColumn = 3;
  }

  return (
    <Box
      display="grid"
      css={{
        gridTemplateColumns: gridTemplateColumns,
        placeItems: ALIGNMENT[align],
        '> *': {
          gridColumn: gridColumn,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
