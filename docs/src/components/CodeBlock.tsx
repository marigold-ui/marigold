import React from 'react';
import b2bTheme from '@marigold/theme-b2b';
import * as Components from '@marigold/components';
import { useStyles } from '@marigold/system';
import * as Icons from '@marigold/icons';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { CopyButton } from './CopyButton';
import { ShowHideButton } from './ShowHideButton';

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
  const [hide, setHide] = React.useState(type === ActionType.Preview);
  const previewBoxStyles = useStyles({
    css: {
      border: '1px solid #e3e3e3',
      borderRadius: b2bTheme.space.xxsmall,
      padding: b2bTheme.space.small,
      position: 'relative',
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
              <div className={previewBoxStyles}>
                <LiveProvider
                  code={codeString}
                  scope={{ ...Components, ...Icons }}
                >
                  <LivePreview />
                </LiveProvider>
                <ShowHideButton hide={hide} onHideChange={setHide} />
              </div>
              {!hide && (
                <LiveProvider scope={{ ...Components, ...Icons }}>
                  <pre
                    className={className}
                    style={{
                      ...style,
                      margin: b2bTheme.space.none,
                      padding: b2bTheme.space.medium,
                      position: 'relative',
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
          scope={{ ...Components, ...Icons }}
          theme={theme}
        >
          <LivePreview className={previewBoxStyles} />
          <LiveEditor />
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
                <pre
                  className={className}
                  style={{
                    ...style,
                    fontSize: '1rem',
                    margin: b2bTheme.space.none,
                    padding: b2bTheme.space.medium,
                    position: 'relative',
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
