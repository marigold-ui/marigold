import Document, { Html, Head, Main, NextScript } from 'next/document';
import { webFontUrl as docFonts } from '~/theme';
import { webFontUrl as b2bFonts } from '@marigold/theme-b2b';

const urls = [...docFonts, ...b2bFonts];

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.bunny.net" />
          <link rel="shortcut icon" href="/favicon.ico" />
          {urls.map(url => (
            <link key={url} href={url} rel="stylesheet" />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
