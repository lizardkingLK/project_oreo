import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className='bg-green-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
