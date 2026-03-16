import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "ClaudeCode.Tokyoについて",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          ClaudeCode.Tokyoは、Anthropicが開発したAIコーディングツール
          「Claude Code」に特化した日本語メディアです。
        </p>

        <h2>ミッション</h2>
        <p>
          Claude
          Codeの使い方、最新ニュース、Tipsを、初心者の方にもわかりやすい言葉でお届けします。プログラミング経験がない方でも、AIの力を活用できるようサポートします。
        </p>

        <h2>コンテンツ</h2>
        <ul>
          <li>
            <strong>入門ガイド</strong> —
            インストールから基本操作まで、はじめての方向け
          </li>
          <li>
            <strong>Tips & テクニック</strong> —
            実務で使えるコツやベストプラクティス
          </li>
          <li>
            <strong>最新ニュース</strong> —
            アップデート情報や新機能のレビュー
          </li>
          <li>
            <strong>比較レビュー</strong> —
            他のAIツールとの違いを客観的に分析
          </li>
          <li>
            <strong>活用事例</strong> — 企業・個人の導入事例やユースケース
          </li>
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
