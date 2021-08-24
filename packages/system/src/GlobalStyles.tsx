import React from 'react';
import { Box } from '@marigold/components';

export const GlobalStyles: React.FC = ({children}) => {
  return <Box variant="styles.root">{children}</Box>
}