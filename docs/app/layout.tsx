import { source } from '@/lib/source';
import type { Node } from 'fumadocs-core/page-tree';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './global.css';
import { type PageEntry, Providers } from './providers';

function collectPages(nodes: Node[]): PageEntry[] {
  const pages: PageEntry[] = [];
  for (const node of nodes) {
    if (node.type === 'page' && typeof node.name === 'string') {
      pages.push({ name: node.name, url: node.url });
    } else if (node.type === 'folder') {
      if (node.index && typeof node.index.name === 'string') {
        pages.push({ name: node.index.name, url: node.index.url });
      }
      pages.push(...collectPages(node.children));
    }
  }
  return pages;
}

const inter = Inter({
  subsets: ['latin'],
});

// Metadata
// ---------------
const FAV_ICONS = {
  development: '/logo-dev.svg',
  preview: '/logo-preview.svg',
};

export const metadata = {
  title: 'Marigold Design System',
  description: "Documentation of Reservix' Design System",
  icons: {
    icon:
      // @ts-expect-error TS2538
      FAV_ICONS[process.env.NEXT_PUBLIC_VERCEL_ENV] || '/logo.svg',
  },
};

// Layout
// ---------------
const Layout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Suspense>
          <Providers pages={collectPages(source.pageTree.children)}>
            {children}
          </Providers>
          <div id="portalContainer" data-theme="rui" className="not-prose" />
        </Suspense>
      </body>
    </html>
  );
};

export default Layout;
