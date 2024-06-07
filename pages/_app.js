import "@/styles/globals.css";
import { Web3Modal } from '@/context/web3modal'
import Header from "@/components/Header";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Web3Modal>
        <Head>
            <title>RAWR Wrappa</title>
            <meta name="description" content="RAWR Wrappa - RAWR wrapping dapp" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
      <Header />
      <Component {...pageProps} />
    </Web3Modal>
    )
}
