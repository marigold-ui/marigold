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

  const pageTreeActions = useMemo<SearchItemType[]>(() => {
    if (search.length === 0) return [];

    const normalized = search.toLowerCase();
    const matches = pages.filter(p =>
      p.name.toLowerCase().includes(normalized)
    );

    return matches.map((match, i) => ({
      id: `quick-action-${i}`,
      type: 'action' as const,
      node: (
        <div className="text-fd-muted-foreground flex h-full items-center gap-2">
          <ArrowRight className="size-4" />
          <p>
            Jump to{' '}
            <span className="text-fd-foreground font-medium">{match.name}</span>
          </p>
        </div>
      ),
      onSelect: () => router.push(match.url),
    }));
  }, [router, search, pages]);

  const items = useMemo(() => {
    if (query.data === 'empty' && pageTreeActions.length === 0) return null;
    return [
      ...pageTreeActions,
      ...(Array.isArray(query.data) ? query.data : []),
    ];
  }, [query.data, pageTreeActions]);

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
        <SearchDialogList items={items} />
        <SearchDialogFooter />
      </SearchDialogContent>
    </SearchDialog>
  );
}
