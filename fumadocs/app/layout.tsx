import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './global.css';
import { Providers } from './providers';

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
          <Providers>{children}</Providers>
          <div id="portalContainer" data-theme="rui" className="not-prose" />
        </Suspense>
      </body>
    </html>
  );
};

export default Layout;
