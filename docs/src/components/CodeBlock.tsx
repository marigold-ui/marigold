import React from 'react';
import b2bTheme from '@marigold/theme-b2b';
import * as Components from '@marigold/components';
import * as Icons from '@marigold/icons';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { CopyButton } from './CopyButton';
import { ShowHideButton } from './ShowHideButton';

const previewBoxStyles = {
  border: '1px solid #e3e3e3',
  borderRadius: b2bTheme.space.xxsmall,
  padding: b2bTheme.space.small,
  position: 'relative',
};

type CodeBlockProps = {
  codeString?: string;
  language?: string;
  props?: ???;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  codeString,
  language,
  ...props
}) => {
  const [hide, setHide] = React.useState(!props['code-only']);

  if (props['live-code']) {
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
            {!props['code-only'] && (
              <div style={previewBoxStyles}>
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
              <pre
                className={className}
                style={{
                  ...style,
                  margin: b2bTheme.space.none,
                  padding: b2bTheme.space.medium,
                  position: 'relative',
                }}
                scope={{ ...Components, ...Icons }}
              >
                <CopyButton codeString={codeString} />
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
            <br />
          </>
        )}
      </Highlight>
    );
  }
};
