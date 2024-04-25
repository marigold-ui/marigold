'use-client';

import { b2bTheme, coreTheme, theme } from '@/theme';
import { MarigoldProvider } from '@/ui';

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
        <MarigoldThemeSwitch themes={themes} initial="b2b">
          <MarigoldProvider theme={theme}>
            <SiteHeader />
            <aside
              className={[
                'top-[--page-header-height]',
                'py-[--page-sub-nav-padding] xl:py-[--page-sub-nav-padding-xl]',
                'pl-[--page-padding] xl:pl-[--page-padding-xl]',
                'h-[calc(100vh-var(--page-header-height))] w-[--page-sub-nav-width] xl:w-[--page-sub-nav-width-xl]',
                'fixed z-10 hidden overflow-hidden hover:overflow-y-auto md:block',
                'scrollbar-thin scrollbar-thumb-secondary-400 scrollbar-thumb-rounded-full scrollbar-track-transparent',
                'border-secondary-200 border-r',
              ].join(' ')}
            >
              {/* current section navigation sidebar */}
              <SectionNavigation />
            </aside>
            <main
              className={[
                'py-[--page-main-padding] xl:py-[--page-main-padding-xl]',
                'px-[--page-padding] xl:pr-[--page-padding-xl]',
                'md:pl-[calc(var(--page-sub-nav-width)+var(--page-main-padding))] xl:pl-[calc(var(--page-sub-nav-width-xl)+var(--page-main-padding-xl))]',
              ].join(' ')}
            >
              {children}
              <SiteFooter />
            </main>
          </MarigoldProvider>
        </MarigoldThemeSwitch>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
