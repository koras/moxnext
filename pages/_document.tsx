import { Html, Head, Main, NextScript } from 'next/document'
import { Metrika } from '../lib/metrika';

export default function Document() {
  return (
    <Html lang="en">
        <Head>
          <Metrika />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
