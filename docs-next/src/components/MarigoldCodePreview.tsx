import React from 'react';
import { SandpackClient } from '@codesandbox/sandpack-client';

const client = new SandpackClient('iframe', {
  files: {
    '/App.js': {
      code: `console.log(require('uuid'))`,
    },
  },
  entry: 'index.js',
  dependencies: {
    uuid: 'latest',
  },
});

client.updatePreview({
  files: {
    'App.js': {
      code: `console.log("New Text")`,
    },
  },
  entry: '/index.js',
  dependencies: {
    uuid: 'latest',
  },
});

export default function MarigoldCodePreview() {
  if (typeof window !== 'undefined') {
    return <iframe id="iframe" title="iframe" />;
  }
}
