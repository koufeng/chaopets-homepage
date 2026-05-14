import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wuxing-beasts.com"),
  title: "五行小兽 · Wǔ Xíng Beasts",
  description: "五行小兽官网 · 一座会呼吸的东方奇幻数字藏馆",
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="zh-CN" data-locale="zh">
      <head>
        <meta name="theme-color" content="#0c0a14" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
        />
        {plausibleDomain ? <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" /> : null}
        {gaId ? <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} /> : null}
        {gaId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config","${gaId}",{anonymize_ip:true});`,
            }}
          />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
