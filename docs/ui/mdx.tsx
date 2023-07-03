import { useMDXComponent } from 'next-contentlayer/hooks';

import { Message } from '@/ui';

const components = {
  // TODO: wrap Marigold's Image/Link with next's image/link component
  Message,
};

interface MdxProps {
  code: string;
}

export const Mdx = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code);
  return <Component components={components as any} />;
};
