import React, { ReactNode } from 'react';

import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { useListContext } from './Context';

export interface ListItemProps extends ComponentProps<'li'> {
  children?: ReactNode;
}

export const ListItem = ({ children, ...props }: ListItemProps) => {
  const { styles } = useListContext();
  return (
    <Box {...props} as="li" css={styles}>
      {children}
    </Box>
  );
};
