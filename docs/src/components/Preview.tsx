import React, { Component, RefObject } from 'react';
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

type CodeBlockProps = {
  className?: string;
  codeString: string;
  type: ActionType;
  language?: Language;
};

const codeBoxStyles = {
  fontFamily: 'monospace',
  bg: '#F6F8FA',
  fontSize: 'body',
  p: 'small',
} as CSSObject;

/**
 * Custom styled LiveEditor component which renders a component preview and editable code.
 */
const LiveEdit: React.FC<CodeBlockProps> = ({
  codeString,
  type = ActionType.CollapseCode,
}) => {
  const [hide, setHide] = React.useState(type === ActionType.CollapseCode);

  const liveEditorRef = React.createRef<EditorProps>();
  const livePreviewRef = React.createRef<DivProps>();

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
            ref={livePreviewRef as RefObject<Component<DivProps>>}
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
          <Box
            as={LiveEditor}
            ref={liveEditorRef as RefObject<Component<EditorProps>>}
            css={codeBoxStyles}
          />
          <LiveError />
          <CopyButton codeString={codeString} />
        </Box>
      )}
      <br />
    </LiveProvider>
  );
};

export const Preview: React.FC<CodeBlockProps> = ({
  codeString,
  type = ActionType.CollapseCode,
  language = 'tsx',
}) => {
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
