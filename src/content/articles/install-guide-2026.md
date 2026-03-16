---
title: "Claude Codeのインストール方法【2026年最新】全OS対応"
description: "Claude Codeのインストール手順をMac・Windows・Linux別にステップごとに解説。トラブルシューティングも網羅。"
date: "2026-03-16"
category: "getting-started"
tags: ["インストール", "セットアップ", "初心者"]
---

## 必要なもの

Claude Codeを使うには、以下の3つが必要です。

1. **Node.js 18以上** — JavaScriptの実行環境
2. **Claudeのアカウント** — Proプラン以上（月$20〜）
3. **ターミナル** — Mac標準のターミナル.appでOK

## ステップ1: Node.jsのインストール

まず、Node.jsが入っているか確認しましょう。

```bash
node --version
```

`v18.0.0` 以上が表示されればOKです。入っていない場合は [nodejs.org](https://nodejs.org/) からダウンロードしてください。

## ステップ2: Claude Codeのインストール

ターミナルで以下のコマンドを実行します。

```bash
npm install -g @anthropic-ai/claude-code
```

これだけでインストール完了です。

## ステップ3: 初回起動

インストールしたら、プロジェクトのフォルダに移動して起動します。

```bash
cd あなたのプロジェクト
claude
```

初回起動時にブラウザが開き、Claudeアカウントでのログインを求められます。ログインすれば準備完了です。

## ステップ4: 日本語で使えるようにする

デフォルトでは英語で返答されることがあります。プロジェクトのルートに`CLAUDE.md`というファイルを作り、以下を書きましょう。

```markdown
常に日本語で応答してください。
```

これだけで、Claude Codeが日本語で返答するようになります。

## Windows での注意点

Windowsの場合、以下の点に注意してください。

- **WSL2（Windows Subsystem for Linux）** の利用を推奨
- PowerShellでも動きますが、日本語の文字化け（SJIS問題）が発生することがあります
- 文字化けする場合は、ターミナルの文字コードをUTF-8に設定してください

## Web版も使える

ターミナルが苦手な方は、ブラウザで使える **Claude Code on the Web** もあります。claude.aiにログインし、Claude Codeを選択するだけで使えます。

日本語入力の問題もWeb版なら解消されるため、初心者にはWeb版から始めるのもおすすめです。

## よくあるトラブル

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

インストールは3ステップで完了します。迷ったらまずWeb版から始めて、慣れてきたらターミナル版に移行するのがおすすめです。
