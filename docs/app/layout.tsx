'use-client';

import { b2bTheme, coreTheme, theme } from '@/theme';
import { MarigoldProvider } from '@/ui';

import '@marigold/theme-b2b/styles.css';
import '@marigold/theme-core/styles.css';

import { fontSans } from '@/theme/fonts';

import { MarigoldThemeSwitch } from '@/ui/ThemeSwitch';

import { Analytics } from './_components/Analytics';
import { PortalContainer } from './_components/PortalContainer';
import { SectionNavigation } from './_components/SectionNavigation';
import { SiteFooter } from './_components/SiteFooter';
import { SiteHeader } from './_components/SiteHeader';
import './globals.css';

// Metadata
// ---------------

export const metadata = {
  title: 'Marigold Documentation',
  description: "Documentation of Reservix' Design System",
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
        <MarigoldThemeSwitch themes={themes} initial="b2b">
          <MarigoldProvider theme={theme} portalContainer={'portalContainer'}>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1 px-4 lg:px-10 xl:px-20">
                <aside
                  className={[
                    'fixed top-14 z-10 -ml-2 hidden h-[calc(100vh-56px)] w-64 overflow-hidden hover:overflow-y-auto md:block xl:w-72',
                    'scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full',
                    'border-secondary-200 border-r',
                  ].join(' ')}
                >
                  {/* current section navigation sidebar */}
                  <SectionNavigation />
                </aside>
                <div className="px-4 md:pl-80 xl:pl-[360px]">
                  <main className="py-6 xl:py-10">{children}</main>
                  <SiteFooter />
                </div>
              </div>
            </div>
            <PortalContainer />
          </MarigoldProvider>
        </MarigoldThemeSwitch>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
