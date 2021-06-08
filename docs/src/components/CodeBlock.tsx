import React from 'react';
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
  const outerPreviewBoxStyles = useStyles({
    css: {
      border: '1px solid #e3e3e3',
      borderRadius: '4px',
    },
  });
  const innerPreviewBoxStyles = useStyles({
    css: {
      padding: '32px 16px',
      position: 'relative',
      overflow: 'auto',
    },
  });
  const codeBoxStyles = useStyles({
    css: {
      fontSize: '1rem',
      margin: 0,
      padding: '32px 16px',
      position: 'relative',
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
                    scope={{ ...Components, ...Icons }}
                  >
                    <LivePreview />
                  </LiveProvider>
                </div>
                <ShowHideButton hide={hide} onHideChange={setHide} />
              </div>
              {!hide && (
                <LiveProvider scope={{ ...Components, ...Icons }}>
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
          scope={{ ...Components, ...Icons }}
          theme={theme}
        >
          <div className={outerPreviewBoxStyles}>
            <LivePreview className={innerPreviewBoxStyles} />
          </div>
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
              <LiveProvider scope={{ ...Components, ...Icons }}>
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
