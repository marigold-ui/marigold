import { Box, Headline, List, Text } from '@marigold/components';
import type { HtmlProps } from '@marigold/types';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

import { CopyButton, Link } from '~/components';

// Typography
// ---------------
export const h1 = ({ children, ...props }: HtmlProps<'h1'>) => (
  <Headline level="1" {...props}>
    {children}
  </Headline>
);

export const h2 = ({ children, ...props }: HtmlProps<'h2'>) => (
  <Headline level="2" {...props}>
    {children}
  </Headline>
);

export const h3 = ({ children, ...props }: HtmlProps<'h3'>) => (
  <Headline level="3" {...props}>
    {children}
  </Headline>
);

export const h4 = ({ children, ...props }: HtmlProps<'h4'>) => (
  <Headline level="4" {...props}>
    {children}
  </Headline>
);

export const h5 = ({ children, ...props }: HtmlProps<'h5'>) => (
  <Headline level="5" {...props}>
    {children}
  </Headline>
);

export const h6 = ({ children, ...props }: HtmlProps<'h6'>) => (
  <Headline level="6" {...props}>
    {children}
  </Headline>
);

export const p = Text;

export const a = ({ children, href = '#', ...props }: HtmlProps<'a'>) => (
  <Link href={href} {...props}>
    {children}
  </Link>
);

export const ul = ({ children, ...props }: HtmlProps<'ul'>) => (
  <List {...props}>{children}</List>
);

export const ol = ({ children, ...props }: HtmlProps<'ol'>) => (
  <List as="ol" {...props}>
    {children}
  </List>
);
export const li = ({ children, ...props }: HtmlProps<'li'>) => (
  <List.Item {...props}>{children}</List.Item>
);

export interface PreProps {
  type: 'code';
  children: {
    props: {
      children: string;
      className: string;
    };
  };
  preview: boolean;
}

export const pre = ({ children, ...props }: PreProps) => {
  const codeProps = children.props;

  const code = (codeProps.children || '').replace(/\n$/, '');
  const language = codeProps.className.replace('language-', '') as Language;

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
          <CopyButton codeString={code} />
        </>
      )}
    </Highlight>
  );
};

export const code = ({ children, ...props }: HtmlProps<'code'>) => (
  <Box
    as="code"
    {...props}
    css={{
      fontFamily: 'mono',
    }}
  >
    {children}
  </Box>
);
