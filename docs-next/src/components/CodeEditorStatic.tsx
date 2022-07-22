import React, { useEffect, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as Components from '@marigold/components';
import { MarigoldTheme } from './MarigoldTheme';
import { Box, Button, Text } from '@marigold/components';

import nightOwl from 'prism-react-renderer/themes/nightOwl';
import copy from 'copy-to-clipboard';
import { useComponentStyles } from '@marigold/system';

interface CodeEditorProps {
  variant?: string;
}

export default function CodeEditorStatic(
  { code }: any,
  { variant }: CodeEditorProps
) {
  const styles = useComponentStyles(
    'CodeEditor',
    { variant },
    {
      parts: [
        'container',
        'livePreview',
        'editorWrapper',
        'buttonWrapper',
        'liveEditor',
        'liveError',
        'text',
        'editor',
        'editorButtonWrapper',
        'editorButton',
      ],
    }
  );

  const [copied, setCopied] = useState(false);
  const [editorCode, setEditorCode] = useState(code.trim());

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
    <Box css={styles.container}>
      <LiveProvider
        code={editorCode}
        scope={{ ...Components }}
        theme={nightOwl}
        disabled={true}
      >
        <MarigoldTheme>
          {/* Live Editor Wrapper and Live Editor */}
          {/* Live Editor Wrapper and Live Editor */}
          <Box css={styles.editorWrapper}>
            <Box css={styles.editor}>
              <Box css={styles.editorButtonWrapper}>
                <Box css={styles.editorButton}></Box>
                <Box css={styles.editorButton}></Box>
                <Box css={styles.editorButton}></Box>
              </Box>
              <Box
                css={styles.buttonWrapper}
                __baseCSS={{
                  zIndex: 1,
                }}
              >
                <Button
                  variant="copy"
                  onPress={() => {
                    setCopied(true);
                  }}
                >
                  {copied ? 'Copied 🎉' : 'Copy'}
                </Button>
              </Box>
            </Box>
            <Box css={styles.liveEditor}>
              <Box
                as={LiveEditor}
                onChange={handleOnChange}
                css={styles.liveEditor}
              ></Box>
            </Box>
          </Box>
        </MarigoldTheme>
      </LiveProvider>
    </Box>
  );
}

// return (
//   // Wrapper
//   <Box
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     flexDirection="column"
//     width="100%"
//   >
//     <LiveProvider code={code} scope={{ ...Components }} theme={nightOwl}>
//       <MarigoldTheme>
//         <CodeEditorPreview />
//         <CodeEditorLive />
//         <CodeEditorError />
//       </MarigoldTheme>
//     </LiveProvider>
//   </Box>
// );
