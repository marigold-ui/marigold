import { DocsLayout } from '@/components/layout/docs';
import { getBadgeMap, source } from '@/lib/source';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const badgeMap = getBadgeMap();

  return (
    <DocsLayout tree={source.pageTree} badgeMap={badgeMap}>
      {children}
    </DocsLayout>
  );
}
