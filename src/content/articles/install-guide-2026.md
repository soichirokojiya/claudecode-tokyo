---
title: "Claude Codeのインストール方法【2026年最新】全OS対応"
description: "Claude Codeのインストール手順をMac・Windows・Linux別にステップごとに解説。トラブルシューティングも網羅。"
date: "2026-03-16"
lastUpdated: "2026-03-20"
category: "getting-started"
priority: 30
thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop&q=80"
tags: ["インストール", "セットアップ", "初心者"]
summary:
  - "Node.js 18以上とClaude Proプラン（月$20〜）があれば3ステップでインストール完了"
  - "npm install -g @anthropic-ai/claude-code の1コマンドで導入可能"
  - "CLAUDE.mdに日本語設定を追加すれば日本語で応答してくれる"
  - "ターミナルが苦手な方はWeb版Claude Codeから始めるのもおすすめ"
faq:
  - question: "Claude CodeはWindowsに対応していますか？"
    answer: "はい、対応しています。ただしWSL2（Windows Subsystem for Linux）の利用が推奨されます。PowerShellでも動作しますが、日本語の文字化け（SJIS問題）が発生する場合があります。"
  - question: "Node.jsのバージョンが古い場合はどうすればいいですか？"
    answer: "nodejs.orgから最新のLTS版をダウンロードしてインストールしてください。nvmを使っている場合は「nvm install --lts」で最新版を導入できます。"
  - question: "インストール時に「permission denied」エラーが出ます"
    answer: "Macの場合は「sudo npm install -g @anthropic-ai/claude-code」と先頭にsudoをつけて実行してください。ただし、npmの権限設定を変更するのがより推奨される方法です。"
  - question: "インストール後にログインできません"
    answer: "ブラウザのポップアップブロッカーが原因の場合があります。ポップアップを許可してから再度「claude」コマンドを実行してください。また、Proプラン以上への加入が必要です。"
  - question: "オフラインでもClaude Codeは使えますか？"
    answer: "いいえ、Claude CodeはクラウドのAIモデルと通信するため、インターネット接続が必須です。オフライン環境では利用できません。"
---

「Claude Codeを使ってみたいけど、インストール方法がわからない」「自分のPCで動くのか不安」という方のために、この記事ではMac・Windows・Linuxすべての環境に対応したClaude Codeのインストール手順をステップごとに解説します。

## Claude Codeのインストールに必要なものは？

Claude Codeを使うには、以下の3つが必要です。

| 必要なもの | 詳細 | 入手方法 |
|-----------|------|---------|
| **Node.js 18以上** | JavaScriptの実行環境 | [nodejs.org](https://nodejs.org/) |
| **Claudeアカウント** | Proプラン以上（月$20〜） | [claude.ai](https://claude.ai/) |
| **ターミナル** | コマンドラインツール | Mac標準のターミナル.appでOK |

## ステップ1: Node.jsをインストールするには？

まず、Node.jsが入っているか確認しましょう。

```bash
node --version
```

`v18.0.0` 以上が表示されればOKです。入っていない場合は [nodejs.org](https://nodejs.org/) からダウンロードしてください。

## ステップ2: Claude Codeを1コマンドでインストール

ターミナルで以下のコマンドを実行します。

```bash
npm install -g @anthropic-ai/claude-code
```

これだけでインストール完了です。

## ステップ3: 初回起動とログイン

インストールしたら、プロジェクトのフォルダに移動して起動します。

```bash
cd あなたのプロジェクト
claude
```

初回起動時にブラウザが開き、Claudeアカウントでのログインを求められます。ログインすれば準備完了です。

## ステップ4: 日本語で使えるようにするには？

デフォルトでは英語で返答されることがあります。プロジェクトのルートに`CLAUDE.md`というファイルを作り、以下を書きましょう。CLAUDE.mdの詳しい書き方は[CLAUDE.mdの書き方ガイド](/articles/claude-md-guide)を参照してください。

```markdown
常に日本語で応答してください。
```

これだけで、Claude Codeが日本語で返答するようになります。

## Mac・Windows・Linuxそれぞれの注意点は？

| OS | 注意事項 | 推奨環境 |
|----|---------|---------|
| **Mac** | そのまま使える | ターミナル.app / iTerm2 / ghostty |
| **Windows** | 日本語文字化けの可能性あり | WSL2を推奨 |
| **Linux** | そのまま使える | 標準ターミナル |

### Windows での注意点

Windowsの場合、以下の点に注意してください。

- **WSL2（Windows Subsystem for Linux）** の利用を推奨
- PowerShellでも動きますが、日本語の文字化け（SJIS問題）が発生することがあります
- 文字化けする場合は、ターミナルの文字コードをUTF-8に設定してください

## ターミナルが苦手ならWeb版もおすすめ

ターミナルが苦手な方は、ブラウザで使える **Claude Code on the Web** もあります。claude.aiにログインし、Claude Codeを選択するだけで使えます。

日本語入力の問題もWeb版なら解消されるため、初心者にはWeb版から始めるのもおすすめです。なお、ターミナルでの日本語入力に問題がある場合は[日本語入力の修正ガイド](/articles/japanese-input-fix)も参考になります。

## インストール時のよくあるトラブルと対処法

### 「permission denied」と表示される
```bash
sudo npm install -g @anthropic-ai/claude-code
```
先頭に`sudo`をつけて再実行してください。

### 「node: command not found」と表示される
Node.jsがインストールされていません。[nodejs.org](https://nodejs.org/)からインストールしてください。

### ログインできない
ブラウザのポップアップブロッカーが原因の場合があります。ポップアップを許可してから再度`claude`コマンドを実行してください。

## まとめ

- **Node.js 18以上 + Claudeアカウント（Proプラン月$20〜）があれば3ステップでインストール完了**
- **`npm install -g @anthropic-ai/claude-code`の1コマンドで導入**でき、初回はブラウザでログインするだけ
- **CLAUDE.mdに日本語設定を書くだけで日本語で応答**してくれるようになる
- **ターミナルが苦手な方はWeb版から始める**のがおすすめ

インストールが完了したら、[Claude Codeとは？機能・料金を初心者向けに解説](/articles/what-is-claude-code)で全体像を把握し、[CLAUDE.mdの書き方ガイド](/articles/claude-md-guide)でプロジェクト設定を最適化しましょう。
