import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DefaultLayout } from '@/ui/layout/DefaultLayout';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
