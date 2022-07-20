import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { webFontUrl } from '../theme';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {webFontUrl.map(url => (
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
