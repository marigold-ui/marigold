import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { Button } from '@marigold/components';

const CodeBlock = props => {
  const [isCopied, setIsCopied] = React.useState(false);
  const className = props.children.props.className || '';
  const matches = className.match(/language-(?<lang>.*)/);
  const code = props.children.props.children.trim();
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ''
      }
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: '20px', position: 'relative' }}
        >
          <Button
            onClick={() => {
              copyToClipboard(code);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 3000);
            }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: '8px',
              padding: '8px 12px',
              background: '#cccccc',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'Inter',
              lineHeight: '1',
            }}
          >
            {isCopied ? 'Copied 🎉' : 'Copy'}
          </Button>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const components = {
  table: props => {
    return <table style={{ width: '100%' }} {...props}></table>;
  },
  th: props => {
    return (
      <th
        style={{ backgroundColor: '#e3e3e3', padding: '8px' }}
        {...props}
      ></th>
    );
  },
  tr: props => {
    return <tr style={{ padding: '8px' }} {...props}></tr>;
  },
  td: props => {
    return <td style={{ padding: '8px' }} {...props}></td>;
  },
  pre: props => {
    return <CodeBlock {...props} />;
  },
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

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
