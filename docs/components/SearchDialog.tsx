'use client';

import { usePages } from '@/app/providers';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SearchItemType,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomSearchDialog(props: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({ type: 'fetch' });
  const pages = usePages();
  const router = useRouter();

  const searchMap = useMemo(() => {
    const map = new Map<string, { name: string; url: string }>();
    for (const page of pages) {
      map.set(page.name.toLowerCase(), page);
    }
    return map;
  }, [pages]);

  const pageTreeAction = useMemo<SearchItemType | undefined>(() => {
    if (search.length === 0) return;

    const normalized = search.toLowerCase();
    for (const [k, page] of searchMap) {
      if (!k.startsWith(normalized)) continue;

      return {
        id: 'quick-action',
        type: 'action',
        node: (
          <div className="text-fd-muted-foreground flex h-full items-center gap-2">
            <ArrowRight className="size-4" />
            <p>
              Jump to{' '}
              <span className="text-fd-foreground font-medium">
                {page.name}
              </span>
            </p>
          </div>
        ),
        onSelect: () => router.push(page.url),
      };
    }
  }, [router, search, searchMap]);

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={
            query.data !== 'empty' || pageTreeAction
              ? [
                  ...(pageTreeAction ? [pageTreeAction] : []),
                  ...(Array.isArray(query.data) ? query.data : []),
                ]
              : null
          }
        />
        <SearchDialogFooter />
      </SearchDialogContent>
    </SearchDialog>
  );
}
