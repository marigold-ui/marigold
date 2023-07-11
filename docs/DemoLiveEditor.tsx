import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import * as components from '@marigold/components';
import React from 'react';

type Props = {
  noInline?: boolean;
  code: string;
};

const scope = {
  ...React,
  ...components,
};

const LiveDemoEditor = ({ noInline = false, code }: Props) => {
  return (
    <LiveProvider scope={scope} code={code.trim()} noInline={noInline}>
      <LiveEditor className="w-2/4" />
      <LivePreview />
      <LiveError />
    </LiveProvider>
  );
};

export default LiveDemoEditor;
