import { theme } from '@/theme';
import { MarigoldProvider } from '@/ui';
import { Suspense } from 'react';
import { fontSans } from '@/theme/fonts';
import { Analytics } from './_components/Analytics';
import { PortalContaier } from './_components/PortalContainer';
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
      // @ts-expect-error TS2538
      FAV_ICONS[process.env.NEXT_PUBLIC_VERCEL_ENV] || '/logo.svg',
  },
};

// Layout
// ---------------
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className="scrollbar scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thumb-rounded-full"
    >
      <body className={`${fontSans.className} min-h-screen`}>
        <Suspense>
          <MarigoldProvider theme={theme} className="min-h-screen">
            {children}
          </MarigoldProvider>
          <PortalContaier />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
