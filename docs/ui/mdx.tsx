'use client';
import { AppearanceTable } from '@/app/components/components';

import { useMDXComponent } from 'next-contentlayer/hooks';

import * as Components from './';

const components = {
  // TODO: wrap Marigold's Image/Link with next's image/link component
  ...Components,
  // TODO: wrap Marigold's Image with next/image (Link too!)
  AppearanceTable,
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
