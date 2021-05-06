import React from 'react';
import b2bTheme from '@marigold/theme-b2b';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Button } from '@marigold/components';
import * as Icons from '@marigold/icons';

const previewBoxStyles = {
  border: '1px solid #e3e3e3',
  borderRadius: b2bTheme.space.xxsmall,
  padding: b2bTheme.space.small,
  position: 'relative',
};

const copyToClipboard = props => {
  const element = document.createElement('textarea');
  element.value = props;
  element.setAttribute('readonly', '');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
};

export const CodeBlock = ({ codeString, language, ...props }) => {
  const [hide, setHide] = React.useState(!props['code-only']);
  const ShowHideButton = () => {
    return (
      <Button
        onClick={() => {
          setHide(!hide);
        }}
        style={{
          position: 'absolute',
          bottom: b2bTheme.space.none,
          right: b2bTheme.space.none,
          padding: '8px 12px',
          background: b2bTheme.colors.gray00,
          color: b2bTheme.colors.gray60,
          borderStyle: 'solid',
          borderColor: b2bTheme.colors.gray30,
          borderWidth: '1px 0px 0px 1px',
          borderRadius: '4px 0px 4px 0px',
          cursor: 'pointer',
          fontSize: b2bTheme.fontSizes.xxsmall,
          fontFamily: b2bTheme.fonts.body,
          lineHeight: b2bTheme.lineHeights.heading,
        }}
      >
        {hide ? 'Show code' : 'Hide code'}
      </Button>
    );
  };

  const CopyButton = ({ ...props }) => {
    const [isCopied, setIsCopied] = React.useState(false);
    return (
      <Button
        onClick={() => {
          copyToClipboard(props.codeString);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}
        style={{
          position: 'absolute',
          bottom: b2bTheme.space.none,
          right: b2bTheme.space.none,
          padding: '8px 12px',
          background: '#f6f8fa',
          color: b2bTheme.colors.gray60,
          cursor: 'pointer',
          fontSize: b2bTheme.fontSizes.xxsmall,
          fontFamily: b2bTheme.fonts.body,
          lineHeight: b2bTheme.lineHeights.heading,
        }}
      >
        {isCopied ? 'Copied 🎉' : 'Copy'}
      </Button>
    );
  };

  if (props['live-code']) {
    return (
      <LiveProvider code={codeString} scope={{ Button, Icons }} theme={theme}>
        <LivePreview style={previewBoxStyles} />
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
                <LiveProvider code={codeString} scope={{ Button, Icons }}>
                  <LivePreview />
                </LiveProvider>
                <ShowHideButton />
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
                scope={{ Button, Icons }}
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
