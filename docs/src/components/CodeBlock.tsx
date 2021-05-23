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

type CodeBlockProps = {
  className?: string;
  codeString: string;
  language: Language;
  'code-only'?: boolean;
  'live-code'?: boolean;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  codeString,
  language,
  'code-only': codeOnly,
  'live-code': liveCode,
}) => {
  const [hide, setHide] = React.useState(!codeOnly);
  const previewBoxStyles = useStyles({
    css: {
      border: '1px solid #e3e3e3',
      borderRadius: b2bTheme.space.xxsmall,
      padding: b2bTheme.space.small,
      position: 'relative',
    },
  });

  if (liveCode) {
    return (
      <LiveProvider
        code={codeString}
        scope={{ ...Components, ...Icons }}
        theme={theme}
      >
        <LivePreview className={previewBoxStyles} />
        <LiveEditor
          className={useStyles({
            css: {
              fontSize: '1rem',
            },
          })}
        />
        <LiveError />
      </LiveProvider>
    );
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            {!codeOnly && (
              <div className={previewBoxStyles}>
                <LiveProvider
                  code={codeString}
                  scope={{ ...Components, ...Icons }}
                >
                  <LivePreview />
                </LiveProvider>
                <ShowHideButton hide={hide} onHideChange={setHide} />
              </div>
            )}
            {!hide && (
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
            )}
            <br />
          </>
        )}
      </Highlight>
    );
  }
};
