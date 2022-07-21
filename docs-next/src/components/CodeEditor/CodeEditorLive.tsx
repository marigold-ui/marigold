import React, { useRef } from 'react';
import { Box, Text } from '@marigold/components';
import { LiveEditor } from 'react-live';
import CodeEditorCopyButton from './CodeEditorCopyButton';

export default function CodeEditorLive() {
  // export default function CodeEditorLive(props: { onChange: () => void }) {
  return (
    <Box
      bg="#011627"
      p="8px"
      mt="8px"
      borderRadius="6px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="100%"
      position="relative"
    >
      <CodeEditorCopyButton />
      <Text
        fontSize="12px"
        color="#cccccc"
        __baseCSS={{
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        Editable Example
      </Text>
      <Box as={LiveEditor} p="8px" width="100%"></Box>
    </Box>
  );
}
