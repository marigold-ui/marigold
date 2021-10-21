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

import * as Components from '@marigold/components';
import { Box } from '@marigold/components';
import { Element, ThemeProvider } from '@marigold/system';
import * as Icons from '@marigold/icons';

import { CopyButton } from './CopyButton';
import { ShowHideButton } from './ShowHideButton';
import { useThemeSwitch } from './ThemeSwitch';
import { RefObject } from 'markdown-to-jsx/node_modules/@types/react';

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
  };
  const innerPreviewBoxStyles = {
    position: 'relative',
    py: 'large',
    px: 'small',
  };
  const codeBoxStyles = {
    position: 'relative',
    fontFamily: 'monospace',
    fontSize: 'body',
    py: 'large',
    px: 'small',
  };
  const liveEditorRef = React.createRef<EditorProps>();
  const livePreviewRef = React.createRef<DivProps>();

  // Wann verwenden wir dann Box und wann Element? (Bsp. Zeile 75/76 und 90-103)
  // Was passiert mit den ResponsiveStyleValues falls wir nur noch Element haben?
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
                  <Element
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
                  </Element>
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
          <ThemeProvider theme={current && themes[current]}>
            <Element css={outerPreviewBoxStyles}>
              <Element
                as={LivePreview}
                ref={livePreviewRef as RefObject<Component<DivProps>>}
                css={innerPreviewBoxStyles}
              />
            </Element>
          </ThemeProvider>
          <Element
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
                <Element
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
                </Element>
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
