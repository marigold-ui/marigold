import { siteConfig } from '@/lib/config';
import { b2bTheme, coreTheme, theme } from '@/theme';
import { MarigoldProvider } from '@/ui';
import '@marigold/theme-b2b/styles.css';
import '@marigold/theme-core/styles.css';
import { fontSans } from '@/theme/fonts';
import { MarigoldThemeSwitch } from '@/ui/ThemeSwitch';
import { Analytics } from './_components/Analytics';
import { PortalContaier } from './_components/PortalContainer';
import { SiteHeader } from './_components/SiteHeader';
import './globals.css';

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
        <MarigoldThemeSwitch themes={themes} initial={siteConfig.defaultTheme}>
          <MarigoldProvider theme={theme} className="min-h-screen">
            <SiteHeader />
            {children}
          </MarigoldProvider>
          <PortalContaier />
        </MarigoldThemeSwitch>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
