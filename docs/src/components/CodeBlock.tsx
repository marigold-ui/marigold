import React, { Component } from 'react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  EditorProps,
  DivProps,
} from 'react-live';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { RefObject } from 'markdown-to-jsx/node_modules/@types/react';

import * as Components from '@marigold/components';
import { Box } from '@marigold/components';
import { CSSObject, ThemeProvider } from '@marigold/system';
import * as Icons from '@marigold/icons';

import { CopyButton } from './CopyButton';
import { ShowHideButton } from './ShowHideButton';
import { useThemeSwitch } from './ThemeSwitch';

enum ActionType {
  Preview = 'preview',
  Live = 'live',
  Code = 'code',
}

type CodeBlockProps = {
  className?: string;
  codeString: string;
  type: ActionType;
  language: Language;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  codeString,
  type = 'preview',
  language,
}) => {
  const { current, themes } = useThemeSwitch();
  const [hide, setHide] = React.useState(type === ActionType.Preview);

  const outerPreviewBoxStyles = {
    border: 'grey',
    borderRadius: '4px',
  } as CSSObject;
  const innerPreviewBoxStyles = {
    position: 'relative',
    py: 'large',
    px: 'small',
  } as CSSObject;
  const codeBoxStyles = {
    position: 'relative',
    fontFamily: 'monospace',
    fontSize: 'body',
    py: 'large',
    px: 'small',
  } as CSSObject;

  const liveEditorRef = React.createRef<EditorProps>();
  const livePreviewRef = React.createRef<DivProps>();

  switch (type) {
    case ActionType.Preview: {
      return (
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              <Box css={outerPreviewBoxStyles}>
                <Box css={innerPreviewBoxStyles}>
                  <LiveProvider
                    code={codeString}
                    scope={{ ...Components, ...Icons }}
                  >
                    <ThemeProvider theme={current && themes[current]}>
                      <LivePreview />
                    </ThemeProvider>
                  </LiveProvider>
                </Box>
                <ShowHideButton hide={hide} onHideChange={setHide} />
              </Box>
              {!hide && (
                <LiveProvider scope={{ ...Components, ...Icons }}>
                  <Box
                    as="pre"
                    css={{ ...codeBoxStyles, ...style }}
                    className={className}
                  >
                    {tokens.map((line, i) => (
                      <Box key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </Box>
                    ))}
                    <CopyButton codeString={codeString} />
                  </Box>
                </LiveProvider>
              )}
              <br />
            </>
          )}
        </Highlight>
      );
    }
    case ActionType.Live: {
      return (
        <LiveProvider
          code={codeString}
          scope={{ ...Components, ...Icons }}
          theme={theme}
        >
          <Box css={outerPreviewBoxStyles}>
            <ThemeProvider theme={current && themes[current]}>
              <Box
                as={LivePreview}
                ref={livePreviewRef as RefObject<Component<DivProps>>}
                css={innerPreviewBoxStyles}
              />
            </ThemeProvider>
          </Box>
          <Box
            as={LiveEditor}
            ref={liveEditorRef as RefObject<Component<EditorProps>>}
            css={codeBoxStyles}
          />
          <LiveError />
        </LiveProvider>
      );
    }
    case ActionType.Code: {
      return (
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              <LiveProvider scope={{ ...Components, ...Icons }}>
                <Box
                  as="pre"
                  css={{ ...style, ...codeBoxStyles }}
                  className={className}
                >
                  {tokens.map((line, i) => (
                    <Box key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </Box>
                  ))}
                  <CopyButton codeString={codeString} />
                </Box>
              </LiveProvider>
              <br />
            </>
          )}
        </Highlight>
      );
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};
