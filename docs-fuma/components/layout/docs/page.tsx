'use client';

import { usePathname } from 'fumadocs-core/framework';
import type * as PageTree from 'fumadocs-core/page-tree';
import {
  AnchorProvider,
  type TOCItemType,
  useActiveAnchors,
} from 'fumadocs-core/toc';
import { useTreeContext } from 'fumadocs-ui/contexts/tree';
import { type ComponentProps, type ReactNode, useMemo } from 'react';
import { Link, List, Text } from '@marigold/components';
import { cn } from '@marigold/system';

export interface DocsPageProps {
  toc?: TOCItemType[];

  children: ReactNode;
}

export function DocsPage({ toc = [], ...props }: DocsPageProps) {
  return (
    <AnchorProvider toc={toc} single={true}>
      <article className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]">
        {props.children}
        {/* <Footer /> */}
        {toc.length > 0 && (
          <div className="sticky top-(--fd-nav-height) h-[calc(100dvh-var(--fd-nav-height))] w-[286px] shrink-0 overflow-auto pt-12 pb-2 max-xl:hidden">
            <Text weight="semibold" color="secondary-800">
              On This Page
            </Text>
            <List as="ul">
              {toc.map(item => (
                <TocItem key={item.url} item={item} />
              ))}
            </List>
          </div>
        )}
      </article>
    </AnchorProvider>
  );
}

export function DocsBody(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('prose', props.className)}>
      {props.children}
    </div>
  );
}

export function DocsDescription(props: ComponentProps<'p'>) {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      {...props}
      className={cn('text-fd-muted-foreground mb-8 text-lg', props.className)}
    >
      {props.children}
    </p>
  );
}

export function DocsTitle(props: ComponentProps<'h1'>) {
  return (
    <h1 {...props} className={cn('text-3xl font-semibold', props.className)}>
      {props.children}
    </h1>
  );
}

function TocItem({ item }: { item: TOCItemType }) {
  const isActive = useActiveAnchors().includes(item.url.slice(1));
  return (
    <div
      className={cn(
        'py-0.5',
        item.depth == 3 &&
          'border-secondary-300 hover:border-secondary-800 border-l',
        isActive && 'border-secondary-800'
      )}
    >
      <List.Item>
        <Link
          href={item.url}
          variant="toc"
          data-active={isActive}
          data-level={item.depth}
          style={{
            paddingLeft: Math.max(0, item.depth - 2) * 16,
          }}
        >
          {item.title}
        </Link>
      </List.Item>
    </div>
  );
}
