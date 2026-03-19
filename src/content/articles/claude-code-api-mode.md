---
title: "Claude Code APIモードの活用テクニック：自動化と統合の実践ガイド"
description: "Claude CodeのAPIモード（--print, --output-format）を使ったスクリプト統合やCI/CD連携のテクニックを解説。非対話型での活用法を網羅。"
date: "2026-03-05"
lastUpdated: "2026-03-20"
category: "tips"
thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop&q=80"
tags: ["API", "自動化", "CI/CD", "開発テクニック"]
summary:
  - "claude --printフラグで非対話型モードを起動し、シェルスクリプトやCI/CDパイプラインに組み込み可能"
  - "--output-format jsonを使えばJSON形式で結果を受け取りプログラム的に処理できる"
  - "GitHub Actionsとの統合により、PRレビュー・テスト生成・ドキュメント更新を自動化できる"
faq:
  - question: "APIモードとは何ですか？"
    answer: "Claude Codeのコマンドラインオプション（--print, --output-format）を使って非対話型で実行するモードです。通常の対話型セッションとは異なり、スクリプトやCIパイプラインから呼び出して結果を受け取ることができます。"
  - question: "APIモードとClaude APIは別物ですか？"
    answer: "はい。Claude APIはAnthropicが提供するHTTP APIで、直接モデルにリクエストを送るものです。Claude CodeのAPIモードは、Claude CodeのCLIを非対話型で使う機能で、内部的にClaude Codeのエージェント機能（ファイル読み書き、コマンド実行など）がフルに使えます。"
  - question: "APIモードの料金はどうなりますか？"
    answer: "通常のClaude Code利用と同じ課金体系です。Maxプランの場合はサブスクリプションに含まれ、API直接利用の場合は従量課金となります。CI/CDで頻繁に実行する場合はトークン消費量に注意が必要です。"
author: "ClaudeCode.Tokyo編集部"
---

「Claude Codeをスクリプトから呼び出したい」「CI/CDパイプラインに組み込みたい」——そんなニーズに応えるのがAPIモードです。この記事では、Claude CodeのAPIモード（`--print`、`--output-format`）を使った自動化・統合テクニックを実践例付きで解説します。

## APIモードとは？Claude Codeを非対話型で実行する方法

Claude Codeは通常、ターミナルで対話的に使用しますが、`--print`フラグを付けることで**非対話型モード（APIモード）**で実行できます。このモードでは、プロンプトを引数で渡し、結果を標準出力に返すため、シェルスクリプトやCI/CDパイプラインからの呼び出しに最適です。

```bash
# 基本的な使い方
claude --print "このプロジェクトのREADMEを要約して"

# JSON形式で出力
claude --print --output-format json "src/index.tsの問題点を分析して"
```

## どんなフラグが使える？基本オプション一覧

### --print（-p）

最も基本的なフラグです。対話型UIを起動せず、結果をそのまま標準出力に書き出します。

```bash
# パイプとの組み合わせ
claude -p "このコードをレビューして" < src/main.ts

# 結果をファイルに保存
claude -p "テストケースを生成して" > tests/generated.test.ts
```

### --output-format

出力形式を指定します。`text`（デフォルト）、`json`、`stream-json`から選択できます。

```bash
# JSON形式で構造化された結果を取得
claude -p --output-format json "バグを分析して"
```

JSON出力の場合、以下のような構造で結果が返されます。

```json
{
  "result": "分析結果のテキスト",
  "cost_usd": 0.042,
  "duration_ms": 3200,
  "tokens_used": {
    "input": 15000,
    "output": 2400
  }
}
```

### --max-turns

エージェントのループ回数を制限します。自動化で暴走を防ぐために重要です。

```bash
claude -p --max-turns 5 "このバグを修正して"
```

## CI/CDパイプラインにどう組み込む？GitHub Actions連携の実例

### GitHub Actions での活用

GitHub ActionsにClaude Codeを組み込むことで、PR作成時に自動的にコードレビューやテスト生成を行えます。より詳しいGitHub Actions連携については[GitHub Actionsガイド](/articles/github-actions-guide)を参照してください。

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Run Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/main...HEAD | claude -p \
            "このdiffをレビューして、問題点があればMarkdown形式で指摘して" \
            > review.md
      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: review
            });
```

### 定期実行でのコード品質チェック

cronスケジュールで定期的にコードベースを分析することもできます。

```bash
#!/bin/bash
# daily-analysis.sh
REPORT=$(claude -p --output-format json \
  "プロジェクト全体の技術的負債を分析し、優先度順にリストアップして")

echo "$REPORT" | jq -r '.result' > /tmp/daily-report.md
# Slackに通知するなどの後処理
```

## 実務で使える活用パターン3選

### パターン1：コミットメッセージの自動生成

```bash
# git hookに組み込み
git diff --cached | claude -p \
  "この変更内容に適切なコミットメッセージを日本語で生成して。Conventional Commits形式で。"
```

### パターン2：ドキュメント自動更新

```bash
# APIの変更を検知してドキュメントを更新
claude -p "src/api/ディレクトリのコードを読んで、API仕様書をdocs/api.mdに反映して。既存の形式を維持すること。"
```

### パターン3：依存関係の脆弱性分析

```bash
claude -p --max-turns 3 \
  "package.jsonの依存関係をチェックし、既知の脆弱性がないか分析して"
```

## APIモードで気をつけるべきセキュリティのポイント

APIモードをCI/CDで使用する際は以下の点に注意してください。[セキュリティのベストプラクティス](/articles/security-best-practices)も併せて確認しておくと安心です。

- **APIキーの管理** — 環境変数やシークレットマネージャーで管理し、コードにハードコードしない
- **--max-turnsの設定** — 無限ループを防ぐため必ず上限を設定
- **--allowedToolsの制限** — 本番環境での実行時は使用可能なツールを最小限に制限
- **出力の検証** — AIの出力を無条件に適用せず、テスト通過を必須条件にする

```bash
# ツールを制限した安全な実行例
claude -p --max-turns 3 \
  --allowedTools "Read,Grep,Glob" \
  "セキュリティ上の問題点を分析して"
```

## まとめ

- **`--print`フラグ**でClaude Codeを非対話型で実行し、スクリプトやCI/CDに統合できる
- **`--output-format json`**を併用すれば、結果をプログラム的に処理可能
- **GitHub Actionsとの連携**で、PRレビュー・テスト生成・ドキュメント更新を自動化できる
- **`--max-turns`や`--allowedTools`**でセキュリティと暴走防止の対策が必須
- 小さなスクリプトから始めて段階的に拡張するのが成功のコツ

APIモードをさらに活用するなら、[Claude Codeのワークフロー自動化](/articles/claude-code-workflow-automation)や[料金プランの選び方](/articles/pricing-guide-2026)もチェックしてみてください。
