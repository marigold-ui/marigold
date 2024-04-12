'use-client';

import { b2bTheme, coreTheme, theme } from '@/theme';
import { MarigoldProvider } from '@/ui';
import { Suspense } from 'react';

import '@marigold/theme-b2b/styles.css';
import '@marigold/theme-core/styles.css';

import { fontSans } from '@/theme/fonts';

import { MarigoldThemeSwitch } from '@/ui/ThemeSwitch';

import { Analytics } from './_components/Analytics';
import { SectionNavigation } from './_components/SectionNavigation';
import { SiteFooter } from './_components/SiteFooter';
import { SiteHeader } from './_components/SiteHeader';
import './globals.css';

// Metadata
// ---------------
const FAV_ICONS = {
  development: '/logo-dev.svg',
  preview: '/logo-preview.svg',
};

export const metadata = {
  title: 'Marigold Documentation',
  description: "Documentation of Reservix' Design System",
  icons: {
    icon:
      // @ts-expect-error
      FAV_ICONS[process.env.NEXT_PUBLIC_VERCEL_ENV] || '/logo.svg',
  },
};

// Themes
// ---------------
const themes = {
  b2b: b2bTheme,
  core: coreTheme,
};

// Layout
// ---------------
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${fontSans.className} min-h-screen`}>
        <Suspense>
          <MarigoldThemeSwitch themes={themes} initial="b2b">
            <MarigoldProvider theme={theme}>
              <div className="flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1 px-4 lg:px-10 xl:px-20">
                  <aside
                    className={[
                      'fixed top-14 z-10 -ml-2 hidden h-[calc(100vh-56px)] w-64 overflow-hidden hover:overflow-y-auto md:block xl:w-72',
                      'scrollbar-thin scrollbar-thumb-secondary-400 scrollbar-thumb-rounded-full scrollbar-track-transparent',
                      'border-secondary-200 border-r',
                    ].join(' ')}
                  >
                    {/* current section navigation sidebar */}
                    <SectionNavigation />
                  </aside>
                  <div className="px-4 md:pl-80 xl:pl-[360px]">
                    <MarigoldProvider theme={theme}>
                      <main className="py-6 xl:py-10">{children}</main>
                    </MarigoldProvider>
                    <SiteFooter />
                  </div>
                </div>
              </div>
            </MarigoldProvider>
          </MarigoldThemeSwitch>
        </Suspense>

        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
