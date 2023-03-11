import { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@/styles/notes.css';
import { UserProvider } from '@auth0/nextjs-auth0';
import { NextSeo } from 'next-seo';
import Script from 'next/script';
import { SWRConfig } from 'swr';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Script
        strategy='afterInteractive'
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
        src={process.env.NEXT_PUBLIC_ANALYTICS_URL}></Script>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
        <Component {...pageProps} />
      </SWRConfig>
    </UserProvider>
  );
}
