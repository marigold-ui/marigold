import './globals.css';
import { Inter } from 'next/font/google';

import { MarigoldProvider } from '@/ui';
import { theme } from '@/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Marigold Documentation',
  description: "Documentation of Reservix' Design System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <MarigoldProvider theme={theme}>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full bg-white">
              <div className="container">Marigold Docs</div>
            </header>
            <div className="flex-1">
              <div className="container">{children}</div>
            </div>
            <footer className="container">Marigold Footer</footer>
          </div>
        </MarigoldProvider>
      </body>
    </html>
  );
}
