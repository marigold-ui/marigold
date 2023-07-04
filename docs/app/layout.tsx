import './globals.css';

import { MarigoldProvider } from '@/ui';
import { theme } from '@/theme';
import { fontSans } from '@/theme/fonts';

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
      <body className={fontSans.variable}>
        <MarigoldProvider theme={theme}>{children}</MarigoldProvider>
      </body>
    </html>
  );
}
