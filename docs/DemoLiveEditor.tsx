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
      <div className="flex">
        <LiveEditor />
        <LivePreview />
      </div>
      <LiveError />
    </LiveProvider>
  );
};

export default LiveDemoEditor;
