'use client';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Button } from '@marigold/components';
import LiveDemoEditor from '@/DemoLiveEditor';
import { BasicButton, Counter } from '../demo/components';
const components = {
  LiveDemoEditor,
  Image, // TODO: wrap Marigold's Image with next/image (Link too!)
  Button,
  BasicButton,
  Counter,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
