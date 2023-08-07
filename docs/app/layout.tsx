import './globals.css';
import '@marigold/theme-b2b/index.css';
import '@marigold/theme-core/index.css';

import { MarigoldProvider } from '@/ui';
import { MarigoldThemeSwitch } from '@/ui/ThemeSwitch';
import { theme, b2bTheme, coreTheme } from '@/theme';
import { fontSans } from '@/theme/fonts';

import { Analytics } from './_components/Analytics';
import { Navigation } from './_components/Navigation';
import { SiteHeader } from './_components/SiteHeader';
import { SiteFooter } from './_components/SiteFooter';

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
          <MarigoldProvider theme={theme}>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <div className="container flex-1">
                <aside
                  className={[
                    'fixed top-14 z-20 -ml-2 hidden h-[calc(100vh-56px)] w-60 overflow-hidden hover:overflow-y-auto md:block',
                    'scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full',
                  ].join(' ')}
                >
                  <Navigation />
                </aside>
                <div className="md:pl-60 lg:pl-80 xl:pl-96">
                  <main>{children}</main>
                  <SiteFooter />
                </div>
              </div>
            </div>
          </MarigoldProvider>
        </MarigoldThemeSwitch>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
