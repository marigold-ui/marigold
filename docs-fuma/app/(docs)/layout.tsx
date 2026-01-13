import { getBadgeMap, source } from '@/lib/source';
import type { ReactNode } from 'react';
import { DocsLayout } from '@/ui/layout/docs';

export default function Layout({ children }: { children: ReactNode }) {
  const badgeMap = getBadgeMap();

  return (
    <DocsLayout tree={source.pageTree} badgeMap={badgeMap}>
      {children}
    </DocsLayout>
  );
}
