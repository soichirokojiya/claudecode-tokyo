import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ClaudeCode.Tokyo — Claude Code専門メディア",
    template: "%s | ClaudeCode.Tokyo",
  },
  description:
    "Claude Code（Anthropic公式CLI）の使い方、Tips、最新ニュースを初心者にもわかりやすくお届けする日本語専門メディア",
  metadataBase: new URL("https://claudecode.tokyo"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ClaudeCode.Tokyo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@claudecodetokyo",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased min-h-dvh">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
