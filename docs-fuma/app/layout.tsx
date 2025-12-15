import { theme } from '@/theme';
import { MarigoldProvider } from '@/ui';
import { RootProvider } from 'fumadocs-ui/provider';
import { ReactNode, Suspense } from 'react';
import { fontSans } from '@/theme/fonts';
import { Nav } from './Nav';
import { Analytics } from './_components/Analytics';
import { SiteHeader } from './_components/SiteHeader';
// import { Analytics } from './_components/Analytics';
import './global.css';

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
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className="scrollbar scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thumb-rounded-full"
    >
      <body className={`${fontSans.className} min-h-screen`}>
        <Suspense>
          <RootProvider>
            <MarigoldProvider
              theme={theme}
              className="bg-bg-body flex min-h-screen flex-col"
            >
              {children}
            </MarigoldProvider>
            <div id="portalContainer" data-theme="rui" className="not-prose" />
          </RootProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
