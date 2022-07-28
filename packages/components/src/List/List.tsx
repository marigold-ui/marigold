import React, { ReactNode } from 'react';

import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { ListContext } from './Context';
import { ListItem } from './ListItem';

export interface ListThemeExtension
  extends ThemeExtensionsWithParts<'List', ['ul', 'ol', 'item']> {}

export interface ListProps extends ComponentProps<'ul'> {
  variant?: string;
  size?: string;
  as?: 'ul' | 'ol';
  children?: ReactNode;
}

export const List = ({
  as = 'ul',
  children,
  variant,
  size,
  ...props
}: ListProps) => {
  const styles = useComponentStyles(
    'List',
    { variant, size },
    { parts: ['ul', 'ol', 'item'] }
  );
  return (
    <Box {...props} as={as} css={styles[as]}>
      <ListContext.Provider value={{ styles: styles.item }}>
        {children}
      </ListContext.Provider>
    </Box>
  );
};

List.Item = ListItem;
