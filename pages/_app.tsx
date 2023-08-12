import { Fragment } from "react";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Oreo</title>
        <meta name="description" content="Oreo Social" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </Fragment>
  );
}
