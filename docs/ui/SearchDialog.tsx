'use client';

import { usePages } from '@/app/providers';
import { track } from '@vercel/analytics';
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
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomSearchDialog(props: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({ type: 'fetch' });
  const pages = usePages();
  const router = useRouter();

  const pageTreeActions = useMemo<SearchItemType[]>(() => {
    if (search.length === 0) return [];

    const normalized = search.toLowerCase();
    const matches = pages.filter(
      p =>
        p.name.toLowerCase().includes(normalized) ||
        // Let users surface every example app by typing "example(s)" (or any
        // substring of it), since the page names themselves don't contain it.
        (p.kind === 'example' && 'examples'.includes(normalized))
    );

    return matches.map((match, i) => {
      const isExample = match.kind === 'example';
      const Icon = isExample ? LayoutDashboard : ArrowRight;

      return {
        id: `quick-action-${i}`,
        type: 'action' as const,
        node: (
          <div className="text-fd-muted-foreground flex h-full items-center gap-2">
            <Icon className="size-4" />
            <p>
              {isExample ? 'Example:' : 'Jump to'}{' '}
              <span className="text-fd-foreground font-medium">
                {match.name}
              </span>
            </p>
          </div>
        ),
        onSelect: () => router.push(match.url),
      };
    });
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
      onOpenChange={open => {
        if (open) track('Use cmkd');
        props.onOpenChange(open);
      }}
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
