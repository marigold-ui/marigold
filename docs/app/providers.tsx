'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import {
  type ReactNode,
  createContext,
  use,
  useSyncExternalStore,
} from 'react';
import dynamic from 'next/dynamic';

const SearchDialog = dynamic(() => import('@/ui/SearchDialog'));

export interface PageEntry {
  name: string;
  url: string;
  /** Distinguishes docs pages from interactive example apps in the cmdk search. */
  kind?: 'doc' | 'example';
}

// ⌘K / Ctrl+K opens the docs search, unless something on the page already
// claimed the key. The examples' command palette handles ⌘K first and marks
// the event, so on those pages the palette opens instead of the docs search.
// Mirrors fumadocs' default hot key, which it does not export, plus the
// `defaultPrevented` check.
const noop = () => () => {};
const MetaOrControl = () =>
  useSyncExternalStore(
    noop,
    () => /Windows|Linux/i.test(navigator.userAgent),
    () => false
  )
    ? 'Ctrl'
    : '⌘';

const hotKey = [
  {
    key: (e: KeyboardEvent) => (e.metaKey || e.ctrlKey) && !e.defaultPrevented,
    display: <MetaOrControl />,
  },
  { key: 'k', display: 'K' },
];

const PagesContext = createContext<PageEntry[]>([]);
export const usePages = () => use(PagesContext);

export const Providers = ({
  pages,
  children,
}: {
  pages: PageEntry[];
  children: ReactNode;
}) => {
  return (
    <PagesContext value={pages}>
      <RootProvider search={{ SearchDialog, hotKey }}>{children}</RootProvider>
    </PagesContext>
  );
};
