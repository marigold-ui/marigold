import './globals.css';

import { MarigoldProvider } from '@/ui';
import { theme } from '@/theme';
import { fontSans } from '@/theme/fonts';

import { Analytics } from './_components/Analytics';
import { Navigation } from './_components/Navigation';
import { SiteHeader } from './_components/SiteHeader';

// Metadata
// ---------------
export const metadata = {
  title: 'Marigold Documentation',
  description: "Documentation of Reservix' Design System",
};

// Layout
// ---------------
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${fontSans.className} min-h-screen`}>
        <MarigoldProvider theme={theme}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="container flex-1">
              <aside className="fixed top-14 z-20 -ml-2 hidden w-60 overflow-y-auto md:block">
                <Navigation />
              </aside>
              <div className="md:pl-60">
                <main className="max-w-3xl">{children}</main>
              </div>
            </div>
            <footer className="container">Marigold Footer</footer>
          </div>
        </MarigoldProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
