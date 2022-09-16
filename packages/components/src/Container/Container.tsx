import React, { ReactNode } from 'react';
import { ComponentProps } from '@marigold/types';
import { size as tokenSize } from '@marigold/tokens';

import { Box } from '../Box';

export interface ContainerProps extends ComponentProps<'div'> {
  children?: ReactNode;
  contentType?: 'content' | 'header';
  size?: keyof typeof tokenSize.content | keyof typeof tokenSize.header;
  align?: 'left' | 'right' | 'center';
  alignItems?: 'left' | 'right' | 'center' | 'none';
}

// for the case that elements whit overflow were used we needed to set the align-items to undefined(it's now default behavior)
const ALIGN_ITEMS = {
  left: 'start',
  center: 'center',
  right: 'end',
  none: 'initial',
};

// for responsive reasons we needed to use the `minmax(0, 60ch)` value instead of `fit-content(60ch)`
const ALIGN = {
  left: (maxWidth: string) => ({
    gridTemplateColumns: `minmax(0, ${maxWidth}) 1fr 1fr`,
    gridColumn: 1,
  }),
  center: (maxWidth: string) => ({
    gridTemplateColumns: `1fr minmax(0, ${maxWidth}) 1fr`,
    gridColumn: 2,
  }),
  right: (maxWidth: string) => ({
    gridTemplateColumns: `1fr 1fr minmax(0, ${maxWidth})`,
    gridColumn: 3,
  }),
};

export const Container = ({
  contentType = 'content',
  size = 'medium',
  align = 'left',
  alignItems = 'none',
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
