import './globals.css';
//import React from 'react';
import { Inter } from 'next/font/google';

import { MarigoldProvider } from '@/components';
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
      <body className={inter.className}>
        <MarigoldProvider theme={theme}>
          <div className="bg-slate-500 p-5">{children}</div>
        </MarigoldProvider>
      </body>
    </html>
  );
}
