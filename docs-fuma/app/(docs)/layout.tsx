// import { DocsLayout } from '@/components/layout/docs/index';
import { DocsLayout } from '@/components/layout/docs';
import { getBadgeMap, source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const badgeMap = getBadgeMap();

  return (
    <DocsLayout tree={source.pageTree} badgeMap={badgeMap}>
      {children}
    </DocsLayout>
  );
}
