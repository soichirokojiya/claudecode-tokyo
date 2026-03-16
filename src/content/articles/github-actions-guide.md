---
title: "Claude Code × GitHub Actions：PR自動レビューからissue実装まで"
description: "Claude CodeのGitHub Actions連携を完全解説。claude-code-actionの導入方法、@claudeメンション、Bedrock/Vertex認証、CI/CDパイプライン統合まで網羅。"
date: "2026-03-16"
lastUpdated: "2026-03-16"
category: "tips"
thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=500&fit=crop&q=80"
tags: ["GitHub Actions", "CI/CD", "自動化", "PR レビュー", "claude-code-action"]
author: "ClaudeCode.Tokyo編集部"
summary:
  - "claude-code-actionを使えばGitHub上で@claudeメンションするだけでPRレビューやissue実装が自動化できる"
  - "Anthropic API、AWS Bedrock、Google Vertex AIの3つの認証方式に対応し、企業環境でも導入可能"
  - "PR作成時の自動コードレビュー、issueへの自動実装PR生成、CI失敗時の自動修正が主要ユースケース"
  - "CLAUDE.mdとの連携でプロジェクト固有のルールに従ったレビュー・実装が可能"
faq:
  - question: "claude-code-actionの導入に必要な前提条件は？"
    answer: "GitHubリポジトリへのAdmin権限、Anthropic APIキー（またはBedrock/Vertexの認証情報）、GitHub ActionsのSecretsへのアクセス権が必要です。リポジトリはpublic/privateどちらでも利用可能です。"
  - question: "@claudeメンションはPR以外でも使えますか？"
    answer: "はい、issueコメントでも使えます。issueに@claudeと書くと、Claude Codeがissueの内容を分析し、実装案を含むPRを自動生成します。また、PRのレビューコメントに@claudeと書いて修正を依頼することも可能です。"
  - question: "claude-code-actionの利用コストはどのくらいですか？"
    answer: "GitHub Actionsの実行時間コスト（パブリックリポジトリは無料）に加え、Claude APIの利用料金がかかります。1回のPRレビューで平均$0.5〜$3程度、issue実装で$2〜$15程度のAPI料金が目安です。"
  - question: "企業のプライベートリポジトリでも安全に使えますか？"
    answer: "はい、AWS BedrockやGoogle Vertex AI経由で利用すれば、コードがAnthropicのAPIに直接送信されることなく、企業のクラウド環境内で処理されます。SOC2準拠のセキュリティ要件を満たしています。"
  - question: "claude-code-actionがPRにコミットしたコードの品質は信頼できますか？"
    answer: "自動生成されたコードは必ず人間がレビューしてからマージすべきです。claude-code-actionはPRとして提出するため、通常のレビュープロセスに組み込まれます。CLAUDE.mdでコーディング規約を定義しておくと、品質をさらに向上できます。"
---

## Claude Code × GitHub Actionsとは

Claude CodeのGitHub Actions連携（**claude-code-action**）は、GitHub上のワークフローにClaude Codeを組み込む公式ツールです。PRへの自動レビュー、issueからの自動実装、CI/CDパイプラインへの統合など、開発プロセスのあらゆる段階でAIを活用できます。

> 出典：[Claude Code公式ドキュメント - GitHub Actions](https://docs.anthropic.com/en/docs/claude-code/github-actions)、[GitHub Marketplace - claude-code-action](https://github.com/marketplace/actions/claude-code-action)

---

## claude-code-actionのセットアップ

### Step 1：必要なSecretsの設定

まず、GitHubリポジトリのSecretsに認証情報を追加します。

| Secret名 | 用途 | 必須/任意 |
|---|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API直接利用 | 3つのうち1つ必須 |
| `AWS_ACCESS_KEY_ID` | AWS Bedrock利用 | Bedrock利用時必須 |
| `AWS_SECRET_ACCESS_KEY` | AWS Bedrock利用 | Bedrock利用時必須 |
| `GCP_SERVICE_ACCOUNT_KEY` | Google Vertex AI利用 | Vertex利用時必須 |

リポジトリの **Settings → Secrets and variables → Actions** から追加してください。

### Step 2：ワークフローファイルの作成

`.github/workflows/claude.yml` を作成します。

```yaml
name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request:
    types: [opened, synchronize]

jobs:
  claude:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && contains(github.event.issue.body, '@claude')) ||
      github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          model: "claude-sonnet-4-6-20260301"
          max_turns: 30
```

### Step 3：動作確認

セットアップ後、以下の方法で動作を確認できます。

1. テスト用のPRを作成 → 自動レビューが投稿されるか確認
2. issueに `@claude このissueの内容を実装してPRを作成して` とコメント
3. PRのレビューコメントに `@claude この部分を修正して` と記入

---

## 主要ユースケース

### ユースケース1：PR自動レビュー

PRが作成されるたびに、Claude Codeが自動的にコードレビューを実行します。

```yaml
# PR作成時に自動レビューを実行
on:
  pull_request:
    types: [opened, synchronize]

steps:
  - uses: anthropics/claude-code-action@v1
    with:
      anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
      prompt: |
        このPRの変更内容をレビューしてください。
        以下の観点でコメントしてください：
        - バグの可能性
        - セキュリティリスク
        - パフォーマンス改善の余地
        - コーディング規約への準拠
```

| レビュー項目 | 検出例 |
|---|---|
| バグの可能性 | null参照、off-by-oneエラー、未処理の例外 |
| セキュリティリスク | SQLインジェクション、XSS、機密情報のハードコード |
| パフォーマンス | N+1クエリ、不要なリレンダリング、メモリリーク |
| コーディング規約 | 命名規則違反、未使用import、不適切なコメント |

### ユースケース2：issueからの自動実装

issueに `@claude` とメンションすると、Claude Codeがissueの内容を分析し、実装PRを自動生成します。

```
# issueの例
タイトル：ユーザープロフィールページにアバター画像アップロード機能を追加

本文：
@claude 以下の要件でアバター画像アップロード機能を実装してPRを作成してください。

- 対応フォーマット：JPEG, PNG, WebP
- 最大ファイルサイズ：5MB
- リサイズ：200x200pxにサーバーサイドでリサイズ
- ストレージ：S3にアップロード
- 既存のsrc/pages/profile.tsxに追加
```

Claude Codeはこのissueを受け取ると、以下を自動で実行します。

1. リポジトリのコードベースを分析
2. 既存のコードパターンに沿った実装を生成
3. テストコードを作成
4. PRを自動作成し、issueにリンク

### ユースケース3：CI失敗時の自動修正

CIが失敗した場合に、Claude Codeが自動的に修正コミットを作成する設定も可能です。

```yaml
on:
  check_suite:
    types: [completed]

jobs:
  auto-fix:
    if: github.event.check_suite.conclusion == 'failure'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            CIが失敗しています。エラーログを分析し、修正コミットを作成してください。
```

---

## 認証方式の比較

### 3つの認証方式

| 認証方式 | 適用場面 | メリット | デメリット |
|---|---|---|---|
| **Anthropic API直接** | 個人・小規模チーム | セットアップが簡単 | コードがAnthropicに送信される |
| **AWS Bedrock** | 企業（AWS利用） | AWSセキュリティ統合、データ主権 | セットアップが複雑 |
| **Google Vertex AI** | 企業（GCP利用） | GCPセキュリティ統合、データ主権 | セットアップが複雑 |

### AWS Bedrockでの設定例

```yaml
steps:
  - uses: anthropics/claude-code-action@v1
    with:
      use_bedrock: true
      model: "us.anthropic.claude-sonnet-4-6-20260301-v1:0"
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_REGION: "us-east-1"
```

### Google Vertex AIでの設定例

```yaml
steps:
  - uses: google-github-actions/auth@v2
    with:
      credentials_json: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}

  - uses: anthropics/claude-code-action@v1
    with:
      use_vertex: true
      model: "claude-sonnet-4-6@20260301"
    env:
      CLOUD_ML_REGION: "us-east5"
      ANTHROPIC_VERTEX_PROJECT_ID: "your-project-id"
```

---

## CLAUDE.mdとの連携

### プロジェクト固有のルールを自動適用

リポジトリにCLAUDE.mdを配置しておくと、claude-code-actionが自動的にそのルールに従います。

```markdown
# CLAUDE.md
## コーディング規約
- TypeScriptを使用（JavaScriptは不可）
- 関数コンポーネントのみ使用（クラスコンポーネント禁止）
- テストはVitestで記述

## ディレクトリ構造
- src/components/ - UIコンポーネント
- src/services/ - ビジネスロジック
- src/api/ - APIエンドポイント

## PRルール
- 1つのPRでは1つの機能のみ変更
- テストカバレッジ80%以上を維持
```

この設定により、issueからの自動実装もPRレビューも、プロジェクトのルールに沿って実行されます。

---

## 実践的なワークフロー構成

### 推奨するCI/CDパイプライン

```
PR作成
  ↓ [自動] claude-code-action：コードレビュー
  ↓ [自動] 既存CI：lint, test, build
  ↓ [手動] 人間のレビュー
  ↓ [自動] マージ後のデプロイ
```

| フェーズ | 実行主体 | 内容 |
|---|---|---|
| コードレビュー | Claude Code（自動） | バグ・セキュリティ・規約チェック |
| 技術検証 | CI/CD（自動） | lint, test, build |
| 最終承認 | 人間（手動） | ビジネスロジック・設計判断 |
| デプロイ | CI/CD（自動） | staging → production |

---

## コスト管理のベストプラクティス

### コストを抑えるテクニック

| テクニック | 効果 | 実装方法 |
|---|---|---|
| **モデル選択** | コスト50〜80%削減 | Sonnet 4.6を使用（Opusの1/5） |
| **max_turnsの制限** | 暴走防止 | `max_turns: 20`で上限設定 |
| **トリガー制限** | 不要な実行防止 | `@claude`メンション時のみ実行 |
| **ファイルフィルター** | 処理範囲限定 | 特定ディレクトリのみ対象 |
| **ブランチ制限** | 対象ブランチ限定 | mainへのPRのみ |

### コスト試算

| シナリオ | 月間実行回数 | 1回あたりコスト | 月間コスト |
|---|---|---|---|
| 小規模チーム（PRレビューのみ） | 50回 | $1 | 約$50 |
| 中規模チーム（レビュー＋issue実装） | 200回 | $3 | 約$600 |
| 大規模チーム（フルパイプライン） | 500回 | $5 | 約$2,500 |

---

## トラブルシューティング

### よくある問題と解決策

| 問題 | 原因 | 解決策 |
|---|---|---|
| Actionが起動しない | トリガー条件の不一致 | `on:`セクションのイベント設定を確認 |
| 権限エラー | permissions設定不足 | `contents: write`, `pull-requests: write`を追加 |
| API認証エラー | Secretの設定ミス | Secret名とワークフロー内の参照名を一致させる |
| タイムアウト | 処理が長すぎる | `max_turns`を減らすか、タスクを分割 |
| 不適切なコミット | CLAUDE.md未設定 | プロジェクトルールをCLAUDE.mdに記述 |

---

## まとめ

Claude Code × GitHub Actionsの連携は、開発ワークフローを大幅に効率化します。`@claude`メンション一つでPRレビューやissue実装が自動化され、人間のエンジニアはより創造的な作業に集中できるようになります。

導入のポイントは以下の3点です。

1. **まずはPR自動レビューから始める** — 最も導入しやすく、効果が実感しやすい
2. **CLAUDE.mdでプロジェクトルールを定義する** — AIの出力品質が安定する
3. **段階的に自動化範囲を拡大する** — issue実装→CI修正と徐々に広げる

> 参考：[Claude Code公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/github-actions)、[GitHub Marketplace - claude-code-action](https://github.com/marketplace/actions/claude-code-action)

企業のプライベートリポジトリでもAWS BedrockやGoogle Vertex AI経由で安全に利用できるため、セキュリティ要件の厳しい環境でも導入を検討する価値があります。
