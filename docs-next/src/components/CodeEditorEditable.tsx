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

export default function CodeEditorEditable(
  { code, noInline }: any,
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
        noInline={noInline ? true : false}
      >
        <MarigoldTheme>
          {/* Live Preview */}
          <Box css={styles.livePreview} as={LivePreview} />

          {/* Live Editor Wrapper and Live Editor */}
          <Box css={styles.editorWrapper}>
            <Box css={styles.editor}>
              <Box css={styles.editorButtonWrapper}>
                <Box css={styles.editorButton}></Box>
                <Box css={styles.editorButton}></Box>
                <Box css={styles.editorButton}></Box>
              </Box>
              <Text __baseCSS={styles.text}>Editable Example</Text>
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

          {/* Live Error */}
          <Box
            as={LiveError}
            css={styles.liveError}
            __baseCSS={{ color: '#ffffff' }}
          />
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
