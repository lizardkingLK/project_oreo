import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: { session, ...pageProps } }: AppProps
) {
  return (
    <>
      <Head>
        <title>Oreo</title>
        <meta name="description" content="Oreo online shopping store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
