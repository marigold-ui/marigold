'use client';
import * as DocComponents from '@/app/components/[...slug]/_components';

import { useMDXComponent } from 'next-contentlayer/hooks';

import * as MarigoldComponents from './';

const components = {
  // TODO: wrap Marigold's Image/Link with next's image/link component
  ...MarigoldComponents,
  ...DocComponents,
};

interface MdxProps {
  title?: string;
  code: string;
}

export const Mdx = ({ title, code }: MdxProps) => {
  const Component = useMDXComponent(code, { title: title });
  // @ts-expect-error (Marigold exports includes some hooks)
  return <Component components={components} />;
};
