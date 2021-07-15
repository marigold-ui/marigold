import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { Item } from '@react-stately/collections';

import * as Components from '@marigold/components';
import { ThemeProvider, useStyles } from '@marigold/system';
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
  const outerPreviewBoxStyles = useStyles({
    css: {
      border: 'grey',
      borderRadius: '4px',
    },
  });
  const innerPreviewBoxStyles = useStyles({
    css: {
      position: 'relative',
      py: 'large',
      px: 'small',
      overflow: 'auto',
    },
  });
  const codeBoxStyles = useStyles({
    css: {
      position: 'relative',
      fontSize: 'body',
      margin: 0,
      py: 'large',
      px: 'small',
      overflow: 'auto',
    },
  });

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
              <div className={outerPreviewBoxStyles}>
                <div className={innerPreviewBoxStyles}>
                  <LiveProvider
                    code={codeString}
                    scope={{ ...Components, ...Icons, Item }}
                  >
                    <ThemeProvider theme={current && themes[current]}>
                      <LivePreview />
                    </ThemeProvider>
                  </LiveProvider>
                </div>
                <ShowHideButton hide={hide} onHideChange={setHide} />
              </div>
              {!hide && (
                <LiveProvider scope={{ ...Components, ...Icons, Item }}>
                  <pre
                    className={className + codeBoxStyles}
                    style={{
                      ...style,
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                    <CopyButton codeString={codeString} />
                  </pre>
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
          scope={{ ...Components, ...Icons, Item }}
          theme={theme}
        >
          <ThemeProvider theme={current && themes[current]}>
            <div className={outerPreviewBoxStyles}>
              <LivePreview className={innerPreviewBoxStyles} />
            </div>
          </ThemeProvider>
          <LiveEditor className={codeBoxStyles} />
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
              <LiveProvider scope={{ ...Components, ...Icons, Item }}>
                <pre
                  className={className + codeBoxStyles}
                  style={{
                    ...style,
                  }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                  <CopyButton codeString={codeString} />
                </pre>
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
