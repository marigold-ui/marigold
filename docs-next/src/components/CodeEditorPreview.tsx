import { Sandpack } from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';
import React from 'react';

export default function CodeEditorPreview(props: {
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

    // Not neccessary
    // if (props.meta) {
    //   const [name, ...params] = props.meta.split(' ');
    //   filePath = (template === 'react-ts' ? '/' : '/src/') + name;

    //   if (params.includes('hidden')) {
    //     fileHidden = true;
    //   }

    //   if (params.includes('active')) {
    //     fileActive = true;
    //   }
    // } else {
    // }

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
      code: props.children.trim(),
      hidden: fileHidden,
      active: fileActive,
    };

    return result;
  }, {});

  return <Sandpack template={template} files={files} theme={nightOwl} />;
}
