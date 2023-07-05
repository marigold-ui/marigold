'use client';
import Image from 'next/image';
import { AppearanceTable } from '@/app/components/components';
import { useMDXComponent } from 'next-contentlayer/hooks';

const components = {
  // TODO: wrap Marigold's Image with next/image (Link too!)
  AppearanceTable,
};

interface MdxProps {
  title?: string;
  code: string;
}

export function Mdx({ title, code }: MdxProps) {
  const Component = useMDXComponent(code, { title: title });

  return <Component components={components} />;
}
