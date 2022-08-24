import Head from 'next/head';

export interface TitleProps {
  title?: string;
}

export const Title = ({ title }: TitleProps) => {
  const pageTitle = `Marigold Docs${title ? ` | ${title}` : ''}`;
  return (
    <Head>
      <title key="page-title">{pageTitle}</title>
    </Head>
  );
};
