import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  data?: { mdx: any };
};

type PagePropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface PageProps {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title?: string;
      };
      headings: { value: string }[];
    };
  };
}

export default function MyApp({ Component, pageProps }: PagePropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(<Component {...pageProps} />);
}
