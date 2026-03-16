---
title: "CLAUDE.mdの書き方ガイド｜精度が上がる設定テンプレート付き"
description: "CLAUDE.mdファイルの書き方を実例テンプレート付きで解説。設定するだけでClaude Codeの精度が劇的に向上します。"
date: "2026-03-14"
category: "tips"
tags: ["CLAUDE.md", "設定", "ベストプラクティス"]
---

## CLAUDE.mdとは？

CLAUDE.mdは、プロジェクトのルートに置く**AIへの指示書**です。

Claude Codeはセッション開始時にこのファイルを自動で読み込みます。「このプロジェクトではTypeScriptを使っています」「テストはJestで書いてください」など、プロジェクト固有のルールをAIに教えられます。

## 基本的な書き方

プロジェクトのルートディレクトリに `CLAUDE.md` というファイルを作成します。

```markdown
# プロジェクトルール

## 言語
- 常に日本語で応答してください
- コード内のコメントは英語で書いてください

## 技術スタック
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL

## コーディング規約
- 関数コンポーネントを使用（クラスコンポーネント禁止）
- 変数名はcamelCase
- ファイル名はkebab-case

## テスト
- テストフレームワーク: Jest + React Testing Library
- テストファイルは `__tests__` ディレクトリに配置
```

## 自動生成もできる

Claude Codeには、CLAUDE.mdを自動生成する `/init` コマンドがあります。

```bash
claude
> /init
```

プロジェクトの構成を分析して、適切なCLAUDE.mdを生成してくれます。ただし、自動生成された内容は必ず確認・修正してください。

## 書き方のコツ

### 1. 200行以内に収める
CLAUDE.mdが長すぎるとAIが混乱します。**150〜200行以内**が推奨です。

### 2. 優先度順に書く
最も重要なルールを先に書きましょう。AIは先に読んだ情報をより重視します。

### 3. 具体的に書く
- 悪い例: 「きれいなコードを書いてください」
- 良い例: 「関数は30行以内、1つの関数は1つの責務のみ」

### 4. やってほしくないことも書く
```markdown
## やらないこと
- any型を使わない
- console.logをコミットしない
- 既存のテストを削除しない
```

## 階層構造で使う

CLAUDE.mdはサブディレクトリにも配置できます。

```
プロジェクト/
├── CLAUDE.md          ← プロジェクト全体のルール
├── src/
│   ├── frontend/
│   │   └── CLAUDE.md  ← フロントエンド固有のルール
│   └── backend/
│       └── CLAUDE.md  ← バックエンド固有のルール
```

サブディレクトリのCLAUDE.mdは、そのディレクトリ内で作業するときだけ読み込まれます。

## 実践例: Webアプリプロジェクト

```markdown
# プロジェクト概要
ECサイトのバックエンド API

## 技術構成
- Node.js + Express
- TypeScript (strict mode)
- PostgreSQL + Prisma ORM
- Redis (キャッシュ)

## 重要なルール
- すべてのAPIエンドポイントにバリデーションを入れること
- SQLインジェクション対策: 必ずPrismaのクエリビルダーを使用
- 環境変数は .env に入れ、コードにハードコーディングしない
- エラーハンドリング: try-catchで適切にエラーをキャッチし、ユーザーにはスタックトレースを見せない

## コマンド
- 開発サーバー: `npm run dev`
- テスト: `npm test`
- ビルド: `npm run build`
- マイグレーション: `npx prisma migrate dev`

## ディレクトリ構造
- src/routes/ — APIルート定義
- src/services/ — ビジネスロジック
- src/models/ — Prismaスキーマ
- src/middleware/ — Express ミドルウェア
```

## まとめ

CLAUDE.mdを設定するだけで、Claude Codeの回答精度は劇的に上がります。まずは最低限「言語」「技術スタック」「コーディング規約」の3点を書くことから始めましょう。
