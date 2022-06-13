import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';

import * as Components from '@marigold/components';
import { Box } from '@marigold/components';
import { CSSObject } from '@marigold/system';
import * as Icons from '@marigold/icons';

import { CopyButton } from './CopyButton';
import { ShowHideButton } from './ShowHideButton';
import { MarigoldTheme } from './MarigoldTheme';

/**
 * Types to show components with editable code or only code in mdx. E.g.:
 * ```tsx expandCode
 *  <SomeComponent />
 * ```
 */
enum ActionType {
  CollapseCode = 'collapseCode',
  ExpandCode = 'expandCode',
  OnlyCode = 'onlyCode',
}

interface CodeBlockProps {
  className?: string;
  codeString: string;
  type: ActionType;
  language?: Language;
}

const codeBoxStyles = {
  fontFamily: 'monospace',
  bg: '#F6F8FA',
  fontSize: 'body',
  p: 'small',
} as CSSObject;

/**
 * Custom styled LiveEditor component which renders a component preview and editable code.
 */
const LiveEdit = ({
  codeString,
  type = ActionType.CollapseCode,
}: CodeBlockProps) => {
  const [hide, setHide] = React.useState(type === ActionType.CollapseCode);

  return (
    <LiveProvider
      code={codeString}
      scope={{ ...Components, ...Icons }}
      theme={theme}
    >
      <Box css={{ border: 'grey', borderRadius: '4px' }}>
        <MarigoldTheme>
          <Box
            as={LivePreview}
            css={{
              py: 'large',
              px: 'small',
            }}
          />
        </MarigoldTheme>
        <ShowHideButton hide={hide} onHideChange={setHide} />
      </Box>
      {!hide && (
        <Box css={codeBoxStyles}>
          <Box as={LiveEditor} css={codeBoxStyles} />
          <LiveError />
          <CopyButton codeString={codeString} />
        </Box>
      )}
      <br />
    </LiveProvider>
  );
};

export const Preview = ({
  codeString,
  type = ActionType.CollapseCode,
  language = 'tsx',
}: CodeBlockProps) => {
  switch (type) {
    case ActionType.CollapseCode: {
      return <LiveEdit codeString={codeString} type={type} />;
    }
    case ActionType.ExpandCode: {
      return <LiveEdit codeString={codeString} type={type} />;
    }
    case ActionType.OnlyCode: {
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
                  <br />
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
