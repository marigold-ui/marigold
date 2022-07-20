import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
  SandpackCodeEditor,
} from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';
import React from 'react';

import { entryCore, entryB2B, entryUnicorn } from './index';

export default function CodeDemo(props: { children: any; theme: string }) {
  let { children, theme } = props;

  let codeSnippets = React.Children.toArray(children);

  const files = codeSnippets.reduce(
    (result: any, codeSnippet: any) => {
      if (codeSnippet.type !== 'pre') {
        return result;
      }

      result['/App.tsx'] = {
        code: codeSnippet.props.children.props.children.trim(),
        hidden: false,
        active: false,
      };

      return result;
    },

    {}
  );

  let themeSnippet = React.Children.toArray(theme);

  const activeTheme = themeSnippet.reduce((result: any) => {
    let setTheme;

    if (theme === 'core') {
      setTheme = entryCore;
    } else if (theme === 'b2b') {
      setTheme = entryB2B;
    } else {
      setTheme = entryUnicorn;
    }

    result['/index.tsx'] = {
      code: setTheme,
      hidden: true,
    };
    return result;
  }, {});

  return (
    <SandpackProvider
      template="react-ts"
      files={{
        ...files,
        ...activeTheme,
      }}
      theme={nightOwl}
      customSetup={{
        dependencies: {
          '@marigold/components': '1.1.0',
          '@marigold/theme-b2b': '9.0.1',
          '@marigold/theme-core': '9.0.2',
          '@marigold/theme-unicorn': '6.0.2',
        },
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor showLineNumbers={true} />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
