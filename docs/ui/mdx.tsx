'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

import * as Components from './';

const components = {
  // TODO: wrap Marigold's Image/Link with next's image/link component
  ...Components,
};

interface MdxProps {
  code: string;
}

export const Mdx = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code);
  // @ts-expect-error (Marigold exports includes some hooks)
  return <Component components={components} />;
};
