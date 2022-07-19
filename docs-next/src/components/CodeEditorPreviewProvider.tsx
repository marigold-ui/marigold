import {
  SandpackProvider,
  SandpackPreview,
  getSandpackCssText,
  SandpackLayout,
  SandpackCodeEditor,
} from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';
import React from 'react';
import MarigoldCodeEditor from './MarigoldCodeEditor';

export default function CodeEditorPreviewProvider(props: {
  children: any;
  template: any;
}) {
  let { children, template = 'react-ts' } = props;
  console.log({ props });

  let codeSnippets = React.Children.toArray(children);

  const files = codeSnippets.reduce((result: any, codeSnippet: any) => {
    if (codeSnippet.type !== 'pre') {
      return result;
    }

    const { props } = codeSnippet.props.children;
    let filePath;
    let fileHidden = false;
    let fileActive = false;

    if (props.className === 'language-js') {
      filePath = '/App.tsx';
    } else if (props.className === 'language-css') {
      filePath = '/styles.css';
      fileHidden = true;
    } else {
      throw new Error(`Code block is missing a filename: ${props.children}`);
    }

    if (result[filePath]) {
      throw new Error(
        `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
      );
    }

    result[filePath] = {
      code:
        `import {Button} from '@marigold/components';\n\n` +
        props.children.trim(),
      hidden: fileHidden,
      active: fileActive,
    };

    return result;
  }, {});

  files['/index.tsx'] = {
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-b2b';
import App from "./App";
const root = createRoot(document.getElementById("root"));
root.render(
<StrictMode>
  <MarigoldProvider theme={theme}>
    <App />
  </MarigoldProvider>
</StrictMode>
);`,
    hidden: true,
  };
  console.log(files);
  return (
    <SandpackProvider
      template={template}
      files={files}
      theme={nightOwl}
      customSetup={{
        dependencies: {
          '@marigold/components': '1.1.0',
          '@marigold/theme-b2b': '9.0.1',
        },
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor showLineNumbers={true} />
        {/* <MarigoldCodeEditor /> */}
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
