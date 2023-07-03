'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

import { Button } from './marigold';

const components = {
  // TODO: wrap Marigold's Image/Link with next's image/link component
  Button,
};

interface MdxProps {
  code: string;
}

export const Mdx = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
};
