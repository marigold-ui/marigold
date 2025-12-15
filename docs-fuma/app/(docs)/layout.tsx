import { DocsLayout } from '@/components/layout/docs/index';
import { baseOptions } from '@/lib/layout.shared';
import { getBadgeMap, source } from '@/lib/source';
// import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { Nav } from '../Nav';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const badgeMap = getBadgeMap();

  return (
    <DocsLayout tree={source.pageTree} badgeMap={badgeMap}>
      {children}
    </DocsLayout>
  );
}
