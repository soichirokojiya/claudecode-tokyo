import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "ClaudeCode.Tokyoについて",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0 py-12">
      <h1 className="text-3xl font-medium tracking-tight text-parchment-900 mb-6">
        About
      </h1>
      <div className="prose max-w-none">
        <p className="text-lg text-parchment-600">
          ClaudeCode.Tokyoは、Anthropicが開発したAIコーディングツール「Claude
          Code」に特化した日本語メディアです。
        </p>

        <h2>ミッション</h2>
        <p>
          Claude
          Codeの使い方、最新ニュース、Tipsを初心者にもわかりやすい言葉でお届けします。プログラミング経験がない方でもAIの力を活用できるようサポートします。
        </p>

        <h2>コンテンツ</h2>
        <ul>
          <li>入門ガイド — インストールから基本操作まで</li>
          <li>Tips & テクニック — 実務で使えるコツ</li>
          <li>最新ニュース — アップデート情報や新機能</li>
          <li>比較レビュー — 他のAIツールとの違い</li>
          <li>活用事例 — 企業・個人の導入事例</li>
        </ul>

        <h2>お問い合わせ</h2>
        <p>
          X (Twitter):{" "}
          <a
            href="https://x.com/claudecodetokyo"
            target="_blank"
            rel="noopener noreferrer"
          >
            @claudecodetokyo
          </a>
        </p>
      </div>
    </div>
  );
}
