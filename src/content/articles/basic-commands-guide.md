---
title: "Claude Codeの基本コマンド一覧｜初心者が最初に覚える15のコマンド"
description: "Claude Codeの基本コマンドを網羅的に解説。/help・/init・/status・/cost・/compact・/modelなど15の必須コマンドの使い方を実行例付きで紹介します。"
date: "2026-03-20"
lastUpdated: "2026-03-20"
category: "getting-started"
priority: 30
thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&q=80"
tags: ["コマンド", "基本操作", "初心者", "チートシート"]
summary:
  - "Claude Codeにはスラッシュコマンドと自然言語の2種類の指示方法がある"
  - "/help、/init、/statusなど15の基本コマンドを覚えれば日常業務をカバーできる"
  - "/compactでトークンを節約し、/costで利用状況を把握するのが賢い使い方"
  - "CLAUDE.mdの初期化には/initが必須。プロジェクト設定の第一歩になる"
faq:
  - question: "Claude Codeのコマンドは全部覚える必要がありますか？"
    answer: "いいえ。まずは/help、/init、/status、/cost、/compactの5つを覚えれば十分です。他のコマンドは必要になったときに/helpで確認できます。"
  - question: "スラッシュコマンドと自然言語の指示はどう使い分けますか？"
    answer: "システム操作（設定変更、状態確認など）にはスラッシュコマンドを使います。コード生成や質問など開発作業には自然言語で指示します。"
  - question: "/compactはどのタイミングで使うべきですか？"
    answer: "会話が長くなりトークン使用量が増えてきたときに使います。/costで確認して残りトークンが少ないと感じたら/compactで会話を圧縮しましょう。"
  - question: "/initで作られるCLAUDE.mdは後から編集できますか？"
    answer: "はい、CLAUDE.mdは通常のMarkdownファイルなので、テキストエディタで自由に編集できます。プロジェクトのルールや設定を追記していきましょう。"
  - question: "コマンドを間違えて入力した場合はどうなりますか？"
    answer: "存在しないスラッシュコマンドを入力すると、Claude Codeがそのままテキストとして解釈します。エラーにはなりませんが、意図した操作は実行されません。/helpで正しいコマンドを確認してください。"
author: "ClaudeCode.Tokyo編集部"
---

## Claude Codeのコマンドとは何か

Claude Codeを使い始めたものの、どんなコマンドがあるのかわからない。
そんな初心者の方に向けて、最初に覚えるべき15のコマンドを解説します。
この記事を読めば、Claude Codeを効率的に操作できるようになります。

Claude Codeには2種類の指示方法があります。

| 指示方法 | 特徴 | 例 |
|---------|------|-----|
| **スラッシュコマンド** | システム操作・設定変更に使う | `/help`、`/init`、`/cost` |
| **自然言語** | コード生成・質問・開発作業に使う | 「Todoアプリを作って」 |

スラッシュコマンドはClaude Codeの「裏方操作」です。
自然言語はAIへの「直接指示」と覚えましょう。

まだClaude Codeをインストールしていない方は、先に[インストールガイド](/articles/install-guide-2026)を参照してください。

## 最初に覚える5つの必須コマンド

### 1. claudeコマンド（起動）

ターミナルで`claude`と入力すると、Claude Codeが起動します。

```bash
claude
```

実行結果：

```
╭──────────────────────────────────╮
│ ✻ Welcome to Claude Code!       │
│   /help for available commands   │
╰──────────────────────────────────╯
```

プロジェクトのルートディレクトリで起動するのがポイントです。
Claude Codeはカレントディレクトリを作業対象として認識します。

オプション付きの起動方法もあります。

```bash
# プロンプトを直接渡して起動
claude "package.jsonの依存関係を確認して"

# 非対話モードで実行
claude -p "このプロジェクトの構造を説明して"

# 会話を再開
claude --continue
```

### 2. /help（ヘルプ表示）

利用可能なコマンドの一覧を表示します。
困ったらまず`/help`を実行しましょう。

```
> /help
```

実行結果：

```
Available commands:
  /help         Show this help message
  /init         Initialize CLAUDE.md
  /status       Show current status
  /cost         Show token usage
  /compact      Compact conversation history
  /clear        Clear conversation
  /model        Change AI model
  /config       Edit configuration
  /permissions  Manage permissions
  ...
```

コマンド名をうろ覚えでも、`/help`さえ覚えていれば大丈夫です。

### 3. /init（プロジェクト初期化）

CLAUDE.mdファイルを生成し、プロジェクトの設定を初期化します。

```
> /init
```

実行結果：

```
I'll analyze your project structure and create a CLAUDE.md file...

Created CLAUDE.md with:
- Project overview
- Tech stack detection
- Coding conventions
- Build/test commands
```

Claude Codeはこのファイルを毎回読み込みます。
プロジェクトのルールや指示を書いておくと、一貫した応答が得られます。

CLAUDE.mdの詳しい書き方は[CLAUDE.md活用ガイド](/articles/claude-md-guide)を参照してください。

### 4. /status（状態確認）

現在のセッション情報を確認できます。

```
> /status
```

実行結果：

```
Session Status:
  Model: claude-sonnet-4-20250514
  Context window: 200k tokens
  Tokens used: 12,450 / 200,000
  Working directory: /Users/you/my-project
  CLAUDE.md: loaded
```

トークンの使用量やモデル情報が一目でわかります。
作業中に定期的に確認する習慣をつけましょう。

### 5. /cost（コスト確認）

現在のセッションのトークン使用量とコストを表示します。

```
> /cost
```

実行結果：

```
Token Usage:
  Input tokens:  8,200
  Output tokens: 4,250
  Total cost:    $0.12

  Session total: $0.45
```

APIモードで利用している場合は特に重要です。
使いすぎを防ぐため、こまめに確認しましょう。

## 会話を管理する3つのコマンド

### 6. /clear（会話クリア）

会話履歴をすべて消去して、新しいセッションを始めます。

```
> /clear
```

実行結果：

```
Conversation cleared. Starting fresh.
```

話題を切り替えるときに使います。
前の会話コンテキストが不要な場合に実行しましょう。

### 7. /compact（会話圧縮）

会話履歴を要約して、トークン使用量を削減します。

```
> /compact
```

実行結果：

```
Compacting conversation...
Before: 45,000 tokens
After:  12,000 tokens
Saved:  33,000 tokens (73%)
```

長い会話を続けているとトークンが膨らみます。
`/compact`で圧縮すれば、コンテキストウィンドウを有効活用できます。

カスタムの圧縮指示も可能です。

```
> /compact フロントエンドの議論だけ残して
```

これにより、必要な情報を選択的に残せます。

### 8. Escキー（操作中断）

コマンドではありませんが、最重要の操作です。
Claude Codeが実行中の処理を中断できます。

```
# Claude Codeが長い処理をしているとき
# Escキーを押すと...

Operation interrupted. What would you like to do?
```

誤った操作をClaude Codeが始めたとき、すぐに止められます。
安全に使うための必須テクニックです。

## 設定を変更する4つのコマンド

### 9. /model（モデル変更）

使用するAIモデルを切り替えます。

```
> /model
```

実行結果：

```
Available models:
  1. claude-sonnet-4-20250514 (default)
  2. claude-opus-4-20250514
  3. claude-haiku-3-20250307

Select model:
```

| モデル | 特徴 | おすすめ用途 |
|-------|------|------------|
| **Sonnet** | バランス型、高速 | 日常の開発作業 |
| **Opus** | 最高精度、低速 | 複雑な設計・レビュー |
| **Haiku** | 最速、低コスト | 簡単な質問・確認 |

タスクに応じてモデルを使い分けると効率的です。

### 10. /config（設定編集）

Claude Codeの設定を変更します。

```
> /config
```

主要な設定項目：

```
Configuration:
  theme: dark
  verbose: false
  autoCompact: true
  preferredLanguage: ja
```

日本語で応答してほしい場合は、CLAUDE.mdに日本語指定を書くのが確実です。

### 11. /permissions（権限管理）

Claude Codeがファイル操作やコマンド実行を行う際の権限を管理します。

```
> /permissions
```

実行結果：

```
Permissions:
  File read:    allowed
  File write:   ask
  Shell execute: ask
  Web access:   denied
```

セキュリティのために、権限設定は理解しておきましょう。

| 権限レベル | 説明 |
|-----------|------|
| **allowed** | 自動で許可される |
| **ask** | 毎回確認が入る |
| **denied** | 拒否される |

初心者のうちは「ask」設定が安全です。
慣れてきたら信頼できる操作を「allowed」に変更しましょう。

### 12. /doctor（環境診断）

Claude Codeの動作環境を診断します。

```
> /doctor
```

実行結果：

```
Environment Check:
  ✓ Node.js: v22.0.0
  ✓ npm: 10.0.0
  ✓ Authentication: valid
  ✓ Network: connected
  ✓ CLAUDE.md: found
```

問題が起きたとき、まず`/doctor`で環境を確認しましょう。
トラブルシューティングの第一歩になります。

## 高度な操作コマンド

### 13. /review（コードレビュー）

Git diffを元に、変更内容のコードレビューを依頼します。

```
> /review
```

実行結果：

```
Reviewing changes...

Found 3 files changed:
  src/app.ts    (+45, -12)
  src/utils.ts  (+8, -3)
  package.json  (+2, -1)

Review:
  ⚠ app.ts:23 - エラーハンドリングが不足しています
  ✓ utils.ts - 問題ありません
  ℹ package.json - 新しい依存関係が追加されました
```

コミット前のセルフレビューに最適です。

### 14. /bug（バグレポート）

Claude Codeのバグを報告します。

```
> /bug
```

問題が発生した場合、このコマンドで報告できます。
ログ情報が自動で添付されます。

### 15. /login（再認証）

認証が切れた場合に再ログインします。

```
> /login
```

実行結果：

```
Opening browser for authentication...
Authentication successful!
```

セッションが長時間続くと認証が切れることがあります。
そのときは`/login`で再認証しましょう。

## コマンドの早見表

全15コマンドを一覧にまとめます。

| コマンド | カテゴリ | 用途 |
|---------|---------|------|
| `claude` | 起動 | Claude Codeを起動する |
| `/help` | 基本 | コマンド一覧を表示する |
| `/init` | 基本 | CLAUDE.mdを生成する |
| `/status` | 基本 | セッション情報を確認する |
| `/cost` | 基本 | トークン使用量を確認する |
| `/clear` | 会話管理 | 会話履歴を消去する |
| `/compact` | 会話管理 | 会話を圧縮してトークンを節約する |
| `Esc` | 会話管理 | 実行中の処理を中断する |
| `/model` | 設定 | AIモデルを切り替える |
| `/config` | 設定 | 設定を変更する |
| `/permissions` | 設定 | 権限を管理する |
| `/doctor` | 設定 | 環境を診断する |
| `/review` | 高度 | コードレビューを依頼する |
| `/bug` | 高度 | バグを報告する |
| `/login` | 高度 | 再認証する |

## コマンドを使いこなすコツ

### よく使う組み合わせパターン

**作業開始時のルーティン：**

```bash
claude              # 起動
> /status           # 状態確認
> /cost             # コスト確認
```

**長時間作業中のメンテナンス：**

```
> /cost             # 使用量チェック
> /compact          # 必要なら圧縮
> /status           # 圧縮後の確認
```

**新プロジェクト開始時：**

```bash
cd my-new-project   # プロジェクトに移動
claude              # 起動
> /init             # CLAUDE.md生成
```

### 効率化のポイント

1. **起動時にプロンプトを渡す**：`claude "型チェックを実行して"`
2. **`/compact`はこまめに**：トークン節約で長く作業できる
3. **`/model`で使い分け**：簡単な作業はHaikuで高速化
4. **`/cost`で予算管理**：API利用時は定期的に確認

## まとめ

この記事で紹介した15のコマンドのポイントです。

- **まず5つ覚える**：`claude`、`/help`、`/init`、`/status`、`/cost`
- **会話管理が重要**：`/compact`と`/clear`でトークンを賢く使う
- **設定は段階的に**：最初はデフォルトで使い、慣れたら`/config`で最適化
- **困ったら`/help`**：コマンドを忘れてもすぐ確認できる

次のステップとして、実際にプロジェクトを作ってみましょう。
[Claude Codeで最初のプロジェクトを作ろう](/articles/first-project-tutorial)で、ハンズオン形式で学べます。

Claude Codeの基本を知りたい方は[Claude Codeとは？](/articles/what-is-claude-code)もあわせてお読みください。
