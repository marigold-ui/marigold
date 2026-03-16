'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode, createContext, useContext } from 'react';
import dynamic from 'next/dynamic';
import { MarigoldProvider } from '@marigold/components';
import { theme } from '@marigold/theme-docs';

const SearchDialog = dynamic(() => import('@/components/SearchDialog'));

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
    <MarigoldProvider theme={theme}>
      <PagesContext value={pages}>
        <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
      </PagesContext>
    </MarigoldProvider>
  );
};
