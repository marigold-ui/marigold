'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode, createContext, useContext } from 'react';
import dynamic from 'next/dynamic';

const SearchDialog = dynamic(() => import('@/ui/SearchDialog'));

export interface PageEntry {
  name: string;
  url: string;
}

const PagesContext = createContext<PageEntry[]>([]);
export const usePages = () => useContext(PagesContext);

export const Providers = ({
  pages,
  children,
}: {
  pages: PageEntry[];
  children: ReactNode;
}) => {
  return (
    <PagesContext value={pages}>
      <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
    </PagesContext>
  );
};
