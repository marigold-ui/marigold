import React, { useEffect, useState } from 'react';
import { Button, Box } from '@marigold/components';

export default function CodeEditorCopyButton() {
  const [copied, setCopied] = useState(false);
  //   const [editorCode, setEditorCode] = useState(code);

  useEffect(() => {
    //Copy the code

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [copied]);

  return (
    <Box
      position="absolute"
      top="4px"
      right="8px"
      __baseCSS={{
        zIndex: 1,
      }}
    >
      <Button
        onPress={() => {
          setCopied(true);
        }}
      >
        {copied ? 'Copied 🎉' : 'Copy'}
      </Button>
    </Box>
  );
}
