import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GA_ID = "G-BTF9ZY9EW8";

export const metadata: Metadata = {
  title: {
    default: "ClaudeCode.Tokyo | Claude Code & エージェントのニュースメディア",
    template: "%s | ClaudeCode.Tokyo",
  },
  description:
    "Claude Code（Anthropic公式CLI）の使い方・Tips・最新ニュース・AIエージェント開発の情報を日本語で網羅的にお届け。初心者からプロまで、AI時代の開発者のための専門メディア。",
  keywords: [
    "Claude Code",
    "Anthropic",
    "AIエージェント",
    "AI コーディング",
    "MCP",
    "Claude",
    "AIプログラミング",
    "開発ツール",
    "Claude Code 使い方",
    "Claude Code Tips",
    "OpenClaw",
  ],
  metadataBase: new URL("https://claudecode.tokyo"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ClaudeCode.Tokyo",
    title: "ClaudeCode.Tokyo | Claude Code & エージェントのニュースメディア",
    description:
      "Claude Code（Anthropic公式CLI）の使い方・Tips・最新ニュース・AIエージェント開発の情報を日本語で網羅的にお届け。",
    url: "https://claudecode.tokyo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@claudecodetokyo",
    creator: "@claudecodetokyo",
    title: "ClaudeCode.Tokyo | Claude Code & エージェントのニュースメディア",
    description:
      "Claude Codeの使い方・Tips・最新ニュース・AIエージェント開発の情報を日本語で網羅的にお届け。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1951633305092804"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased min-h-dvh">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
