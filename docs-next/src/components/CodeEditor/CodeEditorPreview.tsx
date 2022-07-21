import { Box } from '@marigold/components';
import React from 'react';
import { LivePreview } from 'react-live';

export default function CodeEditorPreview(props: { onChange: () => void }) {
  // export default function CodeEditorPreview() {
  return (
    <Box
      width="100%"
      border="1px solid #cccccc"
      borderRadius="6px"
      p="8px"
      as={LivePreview}
    />
  );
}
