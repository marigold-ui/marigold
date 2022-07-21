import React, { useEffect, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as Components from '@marigold/components';
import { MarigoldTheme } from './MarigoldTheme';
import { Box, Button, Text } from '@marigold/components';

import nightOwl from 'prism-react-renderer/themes/nightOwl';
import copy from 'copy-to-clipboard';
import { useComponentStyles } from '@marigold/system';

export default function CodeEditor({ code }: any) {
  const styles = useComponentStyles(
    'CodeEditor',
    {},
    {
      parts: [
        'container',
        'livePreview',
        'editorWrapper',
        'buttonWrapper',
        'copyButton',
        'liveEditor',
        'liveError',
      ],
    }
  );

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
    <Box css={styles.container}>
      <LiveProvider
        code={editorCode}
        scope={{ ...Components }}
        theme={nightOwl}
      >
        <MarigoldTheme>
          {/* Live Preview */}
          <Box css={styles.livePreview} as={LivePreview} />

          {/* Live Editor Wrapper and Live Editor */}
          <Box css={styles.editorWrapper}>
            <Box
              css={styles.buttonWrapper}
              __baseCSS={{
                zIndex: 1,
              }}
            >
              <Box
                as={Button}
                variant="button.primary"
                css={styles.copyButton}
                onPress={() => {
                  setCopied(true);
                }}
              >
                {copied ? 'Copied 🎉' : 'Copy'}
              </Box>
            </Box>
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
            <Box
              as={LiveEditor}
              onChange={handleOnChange}
              css={styles.liveEditor}
            ></Box>
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
