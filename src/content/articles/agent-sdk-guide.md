---
title: "Claude Agent SDKで自作AIエージェントを構築する：実装ガイド"
description: "Claude Agent SDKを使ったAIエージェント開発の手順を解説。npm/PyPIのセットアップからカスタムツール定義、MCP連携、実践的なユースケースまで網羅。"
date: "2026-03-16"
lastUpdated: "2026-03-20"
category: "tips"
featured: true
priority: 100
thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop&q=80"
tags: ["Agent SDK", "開発", "MCP", "自動化"]
author: "ClaudeCode.Tokyo編集部"
summary:
  - "Claude Agent SDKはPython/TypeScript両対応で、pip install claude-agent-sdkまたはnpm install @anthropic-ai/agent-sdkで導入可能"
  - "カスタムツールを定義することでファイル操作・API呼び出し・DB検索など任意の処理をエージェントに委譲できる"
  - "MCP（Model Context Protocol）統合により外部サービスとの連携がシームレスに実現できる"
  - "マルチエージェント構成で複雑なワークフローを分割・並列処理し、業務自動化の幅が広がる"
faq:
  - question: "Claude Agent SDKとClaude APIの違いは何ですか？"
    answer: "Claude APIは単発のメッセージ送受信が中心ですが、Agent SDKはツール実行・ループ制御・ガードレールなどエージェント構築に必要な機能をフレームワークとして提供します。APIの上位レイヤーとして動作し、複雑なワークフローを少ないコードで実装できます。"
  - question: "PythonとTypeScriptのどちらで始めるべきですか？"
    answer: "既存プロジェクトの言語に合わせるのが最善です。新規プロジェクトの場合、Pythonはデータ処理やML連携に強く、TypeScriptはWebアプリやNode.jsベースのツールチェーンとの統合に優れています。機能面での差はほぼありません。"
  - question: "Agent SDKで作ったエージェントの実行コストはどれくらいですか？"
    answer: "APIの従量課金が適用されます。Claude Sonnet使用時は入力$3/100万トークン、出力$15/100万トークンが目安です。エージェントはループ実行するためトークン消費が多くなりがちですが、max_turnsパラメータで上限を設定できます。"
  - question: "MCPサーバーとの連携は必須ですか？"
    answer: "必須ではありません。カスタムツールだけでもエージェントは構築できます。ただし、MCPサーバーを使えばGitHub・Slack・データベースなど既存の連携モジュールを再利用でき、開発工数を大幅に削減できます。"
  - question: "本番環境での運用時に気をつけるべきことは？"
    answer: "ガードレール機能でエージェントの出力を検証し、意図しない操作を防止してください。またmax_turnsでループ回数を制限し、APIコストの暴走を防ぐことが重要です。ログ出力を有効にして各ステップの実行内容を記録することも推奨されます。"
---

「独自のAIエージェントを作ってみたいけど、ゼロから実装するのは大変」「エージェントのループ制御やエラーハンドリングを毎回書くのが面倒」という方へ。Claude Agent SDKを使えば、カスタムツール・MCP連携・マルチエージェント構成を少ないコードで実現できます。

## Claude Agent SDKとは？エージェント開発の全体像

Claude Agent SDKは、Anthropicが提供するAIエージェント構築フレームワークです。Claude APIの上に構築されており、**ツール実行・ループ制御・マルチエージェント連携**といったエージェント開発に必要な機能を統合的に提供します。

従来のClaude APIでは、ツール呼び出しのループ制御やエラーハンドリングを開発者が自前で実装する必要がありました。Agent SDKはこれらの定型処理を抽象化し、ビジネスロジックに集中できる開発体験を実現します。

> 参考: [Anthropic Agent SDK ドキュメント](https://docs.anthropic.com/en/docs/agents-and-tools/agent-sdk)
> 参考: [DoltHub - Building Agents with Claude](https://www.dolthub.com/blog/)

## 最短でセットアップする手順（Python/TypeScript対応）

### Python環境

```bash
pip install claude-agent-sdk
```

### TypeScript/Node.js環境

```bash
npm install @anthropic-ai/agent-sdk
```

### 環境変数の設定

```bash
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
```

| 項目 | Python | TypeScript |
|---|---|---|
| パッケージマネージャ | pip / poetry | npm / yarn / pnpm |
| インストールコマンド | `pip install claude-agent-sdk` | `npm install @anthropic-ai/agent-sdk` |
| 最低ランタイム | Python 3.10+ | Node.js 18+ |
| 型サポート | dataclass / Pydantic | 組み込み型定義 |
| 非同期処理 | asyncio | async/await (ネイティブ) |

## 数行で動く！基本的なエージェントの作成方法

最もシンプルなエージェントは、以下のように数行で作成できます。

### Pythonでの実装例

```python
from claude_agent_sdk import Agent, Runner

agent = Agent(
    name="アシスタント",
    instructions="あなたは親切な日本語アシスタントです。",
    model="claude-sonnet-4-20250514"
)

result = Runner.run_sync(agent, "東京の天気を教えてください")
print(result.final_output)
```

### TypeScriptでの実装例

```typescript
import { Agent, Runner } from '@anthropic-ai/agent-sdk';

const agent = new Agent({
  name: 'アシスタント',
  instructions: 'あなたは親切な日本語アシスタントです。',
  model: 'claude-sonnet-4-20250514',
});

const result = await Runner.run(agent, '東京の天気を教えてください');
console.log(result.finalOutput);
```

## カスタムツールでエージェントの能力を拡張する

エージェントの真価は、外部処理を実行できる**カスタムツール**にあります。ファイル操作、API呼び出し、データベース検索など、任意の処理をツールとして定義できます。

```python
from claude_agent_sdk import Agent, Runner, tool

@tool
def search_database(query: str, limit: int = 10) -> str:
    """データベースからクエリに一致するレコードを検索します。"""
    # 実際のDB検索処理
    results = db.execute(f"SELECT * FROM products WHERE name LIKE '%{query}%' LIMIT {limit}")
    return format_results(results)

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """指定されたアドレスにメールを送信します。"""
    # メール送信処理
    smtp_client.send(to=to, subject=subject, body=body)
    return f"{to}にメールを送信しました"

agent = Agent(
    name="業務アシスタント",
    instructions="あなたは業務効率化を支援するアシスタントです。",
    tools=[search_database, send_email],
    model="claude-sonnet-4-20250514"
)
```

### ツール定義のベストプラクティス

| ポイント | 説明 | 例 |
|---|---|---|
| 明確なdocstring | ツールの用途を具体的に記述する | 「データベースから商品名で検索」 |
| 型ヒントの活用 | 引数と戻り値に型を指定する | `query: str, limit: int = 10` |
| エラーハンドリング | 例外時に分かりやすいメッセージを返す | `return "検索に失敗しました: 接続エラー"` |
| 最小権限の原則 | 必要最低限の操作のみ許可する | 読み取り専用DBユーザーを使用 |
| 冪等性の確保 | 同じ入力で同じ結果を返すようにする | キャッシュ・重複チェックの実装 |

## MCP連携で外部サービスとシームレスに統合

Agent SDKはMCPサーバーとの統合をネイティブにサポートしています。既存のMCPサーバーをそのままエージェントのツールとして利用できます。MCPの基本的な仕組みについては[MCP入門ガイド](/articles/mcp-beginners-guide)を参照してください。

```python
from claude_agent_sdk import Agent, Runner
from claude_agent_sdk.mcp import MCPServerStdio

async def main():
    github_server = MCPServerStdio(
        command="npx",
        args=["@modelcontextprotocol/server-github"],
        env={"GITHUB_TOKEN": "ghp_xxxxx"}
    )

    agent = Agent(
        name="開発アシスタント",
        instructions="GitHubのissueとPRを管理するアシスタントです。",
        mcp_servers=[github_server],
        model="claude-sonnet-4-20250514"
    )

    result = await Runner.run(agent, "未対応のissueを一覧にしてください")
    print(result.final_output)
```

### 活用できるMCPサーバーの例

- **GitHub MCP**: issue管理、PR作成、コードレビュー
- **Slack MCP**: メッセージ送信、チャンネル検索
- **PostgreSQL MCP**: データベースクエリの実行
- **Filesystem MCP**: ファイルの読み書き操作

## 複数エージェントを協調させるマルチエージェント構成

複雑なワークフローは、複数のエージェントに分割して処理できます。各エージェントに専門領域を持たせ、協調動作させることで精度と効率が向上します。

```python
researcher = Agent(
    name="リサーチャー",
    instructions="与えられたテーマについてWeb検索し、情報を収集します。",
    tools=[web_search],
)

writer = Agent(
    name="ライター",
    instructions="収集された情報をもとに記事を執筆します。",
    tools=[write_file],
)

editor = Agent(
    name="エディター",
    instructions="記事の品質をチェックし、修正指示を出します。",
    handoff_agents=[researcher, writer],
)
```

`handoff_agents`を指定することで、エディターエージェントが必要に応じてリサーチャーやライターに処理を委譲できます。

## 本番運用に必須！ガードレールの設定方法

本番運用では、エージェントの出力を検証する**ガードレール**が不可欠です。

```python
from claude_agent_sdk import Agent, Runner, GuardrailFunctionOutput

def check_pii(output: str) -> GuardrailFunctionOutput:
    """個人情報が含まれていないかチェック"""
    has_pii = detect_personal_info(output)
    return GuardrailFunctionOutput(
        should_block=has_pii,
        message="個人情報が検出されたため出力をブロックしました" if has_pii else None
    )

agent = Agent(
    name="カスタマーサポート",
    instructions="顧客からの問い合わせに回答します。",
    output_guardrails=[check_pii],
    model="claude-sonnet-4-20250514"
)
```

## Agent SDKの実践的なユースケース4選

### 1. カスタマーサポートの自動化

顧客からの問い合わせをFAQデータベースと照合し、適切な回答を自動生成するエージェント。回答できない場合は人間のオペレーターにエスカレーションします。

### 2. コードレビューボット

PRが作成されたタイミングでコードを分析し、バグの可能性・セキュリティリスク・パフォーマンス改善点をコメントするエージェント。GitHub MCPとの連携で実現できます。

### 3. データ分析パイプライン

CSVやデータベースからデータを取得し、統計分析・可視化・レポート生成までを自動化するエージェント。Pythonのpandas・matplotlibと組み合わせて使います。

### 4. ドキュメント生成

ソースコードを解析してAPIドキュメントやREADMEを自動生成するエージェント。Filesystemツールでコードを読み取り、構造化されたドキュメントを出力します。

## APIコストの暴走を防ぐ管理テクニック

エージェントはループ実行するため、トークン消費が通常のAPI呼び出しより多くなります。

| パラメータ | 説明 | 推奨値 |
|---|---|---|
| `max_turns` | エージェントの最大ループ回数 | 10〜30 |
| `model` | 使用するモデル | コスト重視ならHaiku、品質重視ならSonnet |
| `instructions` | システムプロンプト | 簡潔で具体的な指示 |
| `tool選択` | 必要なツールのみ登録 | 不要なツールは除外 |

`max_turns`を設定しないとエージェントが無限ループに陥る可能性があるため、必ず上限を指定してください。

## まとめ

- **Claude Agent SDKはPython/TypeScript両対応**で、`pip install`または`npm install`ですぐに導入可能
- **カスタムツールを定義するだけでファイル操作・API呼び出し・DB検索**など任意の処理をエージェントに委譲できる
- **MCP統合により、GitHub・Slack・データベースなど既存の連携モジュールを再利用**でき、開発工数を大幅に削減
- **マルチエージェント構成で複雑なワークフローを分割・並列処理**が可能
- **本番運用ではガードレールとmax_turnsの設定が必須** — コスト暴走と意図しない操作を防止

まずはシンプルな単一エージェントから始めて、徐々にツールやMCPサーバーを追加していきましょう。並列エージェントの実践例は[並列サブエージェントでコードレビューを自動化する方法](/articles/parallel-subagents)で、ワークフロー自動化全般は[Claude Codeワークフロー自動化ガイド](/articles/claude-code-workflow-automation)も参考になります。
