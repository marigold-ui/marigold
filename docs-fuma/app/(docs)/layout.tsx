// import { DocsLayout } from '@/components/layout/docs/index';
import { DocsLayout } from '@/components/layout/docs';
import { getBadgeMap, source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const badgeMap = getBadgeMap();

  return (
    <DocsLayout tree={source.pageTree} badgeMap={badgeMap}>
      {children}
    </DocsLayout>
  );
}
