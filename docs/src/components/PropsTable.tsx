import * as React from 'react';

import { Box, Text } from '@marigold/components';
import { ComponentProps } from '@marigold/types';

/**
 * Keep these Table components until we have an own marigold table component
 */

export const Table: React.FC<ComponentProps<'table'>> = ({
  children,
  ...props
}) => (
  <Box as="table" __baseCSS={{ borderSpacing: 0 }} width="100%" {...props}>
    {children}
  </Box>
);

export const TableHead: React.FC<ComponentProps<'th'>> = ({
  children,
  ...props
}) => (
  <Box
    as="th"
    p="xsmall"
    bg="gray50"
    __baseCSS={{
      ':nth-of-type(2n+0)': {
        bg: 'gray60',
      },
    }}
    {...props}
  >
    <Text color="gray00">{children}</Text>
  </Box>
);

export const TableData: React.FC<ComponentProps<'td'>> = ({
  children,
  ...props
}) => (
  <Box
    as="td"
    __baseCSS={{ borderBottom: '1px solid #8D8D8D' }}
    p="small"
    {...props}
  >
    <Text variant="body">{children}</Text>
  </Box>
);
