import React, { useEffect, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as Components from '@marigold/components';
import { MarigoldTheme } from './MarigoldTheme';
import { Box, Button, Text } from '@marigold/components';

import nightOwl from 'prism-react-renderer/themes/nightOwl';
import copy from 'copy-to-clipboard';
import CodeEditorPreview from './CodeEditor/CodeEditorPreview';
import CodeEditorLive from './CodeEditor/CodeEditorLive';
import CodeEditorError from './CodeEditor/CodeEditorError';

export default function CodeEditorExperience({ code }: any) {
  const [copied, setCopied] = useState(false);
  const [editorCode, setEditorCode] = useState(code);

  useEffect(() => {
    if (copied && editorCode) {
      copy(editorCode);
    }

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [copied, editorCode]);

  const handleOnChange = (newCode: string) => {
    setEditorCode(newCode);
  };

  return (
    // Wrapper
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="100%"
    >
      <LiveProvider
        code={editorCode}
        scope={{ ...Components }}
        theme={nightOwl}
      >
        <MarigoldTheme>
          <CodeEditorPreview onChange={handleOnChange} />
          <CodeEditorLive onChange={handleOnChange} />
          <CodeEditorError />
        </MarigoldTheme>
      </LiveProvider>
    </Box>
  );
}
