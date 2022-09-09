import React, { ReactNode } from 'react';
import { ComponentProps } from '@marigold/types';
import { size as tokenSize } from '@marigold/tokens';

import { Box } from '../Box';

export interface ContainerProps extends ComponentProps<'div'> {
  children?: ReactNode;
  contentType?: 'content' | 'header';
  size?: keyof typeof tokenSize.content | keyof typeof tokenSize.header;
  align?: 'left' | 'right' | 'center';
  alignItems?: 'left' | 'right' | 'center';
}

const ALIGN_ITEMS = {
  left: 'start',
  center: 'center',
  right: 'end',
};

const ALIGN = {
  left: (maxWidth: string) => ({
    gridTemplateColumns: `fit-content(${maxWidth}) 1fr 1fr`,
    gridColumn: 1,
  }),
  center: (maxWidth: string) => ({
    gridTemplateColumns: `1fr fit-content(${maxWidth}) 1fr`,
    gridColumn: 2,
  }),
  right: (maxWidth: string) => ({
    gridTemplateColumns: `1fr 1fr fit-content(${maxWidth})`,
    gridColumn: 3,
  }),
};

export const Container = ({
  contentType = 'content',
  size = 'medium',
  align = 'left',
  alignItems = 'left',
  children,
  ...props
}: ContainerProps) => {
  const maxWidth = tokenSize[contentType][size];

  return (
    <Box
      display="grid"
      css={{
        gridTemplateColumns: ALIGN[align](maxWidth).gridTemplateColumns,
        placeItems: ALIGN_ITEMS[alignItems],
        '> *': {
          gridColumn: ALIGN[align](maxWidth).gridColumn,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
