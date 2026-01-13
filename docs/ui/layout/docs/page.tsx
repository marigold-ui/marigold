'use client';
import { AnchorProvider, type TOCItemType } from 'fumadocs-core/toc';
import { type ReactNode } from 'react';
import { List, Text } from '@marigold/components';
import { TocItem } from './toc';

export { DocsBody, DocsDescription, DocsTitle } from './docs-components';

export interface DocsPageProps {
  toc?: TOCItemType[];

  children: ReactNode;
}

export const DocsPage = ({ toc = [], ...props }: DocsPageProps) => {
  return (
    <AnchorProvider toc={toc} single={true}>
      <article className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]">
        {props.children}
        {toc.length > 0 && (
          <div className="sticky top-(--fd-nav-height) h-[calc(100dvh-var(--fd-nav-height))] w-71.5 shrink-0 overflow-auto pt-12 pb-2 max-xl:hidden">
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
};
