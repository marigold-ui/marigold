'use client';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

const Layout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Suspense>
          <RootProvider>{children}</RootProvider>
          <div id="portalContainer" data-theme="rui" className="not-prose" />
        </Suspense>
      </body>
    </html>
  );
};

export default Layout;
