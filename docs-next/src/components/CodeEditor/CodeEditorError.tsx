import React from 'react';
import { Box } from '@marigold/components';
import { LiveError } from 'react-live';

export default function CodeEditorError() {
  return (
    <Box
      as={LiveError}
      __baseCSS={{ color: '#ffffff' }}
      mt="8px"
      bg="#ff0011"
      p="8px"
      width="100%"
    />
  );
}
