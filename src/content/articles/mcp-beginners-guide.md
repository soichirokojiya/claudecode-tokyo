---
title: "Claude Code MCP入門｜外部ツール連携の始め方"
description: "MCPを使えばClaude CodeをSlack・GitHub・DBと連携可能。初心者向けに設定方法とおすすめサーバーを紹介。"
date: "2026-03-11"
lastUpdated: "2026-03-20"
category: "tips"
thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop&q=80"
tags: ["MCP", "連携", "外部ツール"]
summary:
  - "MCP（Model Context Protocol）はClaude Codeと外部サービス（Slack・GitHub・DB・Notion等）を連携する標準規格"
  - "claude mcp addコマンドで簡単にMCPサーバーを追加でき、GitHub・Slack・PostgreSQL等の公式サーバーが利用可能"
  - "Tool Search機能によりコンテキスト消費を約85%削減し、多数のMCPサーバー接続時のパフォーマンス低下を防げる"
  - "セキュリティ面では公式サーバーの優先利用、最小権限の原則、環境変数でのAPIキー管理が重要"
faq:
  - question: "MCPとは何ですか？"
    answer: "MCP（Model Context Protocol）は、Claude Codeと外部サービスをつなぐための標準規格です。MCPを使うことで、Slack・GitHub・データベース・Notionなどの外部サービスとClaude Codeを連携させることができます。"
  - question: "MCPサーバーの追加方法を教えてください"
    answer: "ターミナルでclaude mcp add サーバー名 コマンドを実行します。例えばGitHub MCPサーバーの場合は、claude mcp add github npx @modelcontextprotocol/server-githubと入力します。"
  - question: "MCPサーバーのセキュリティは大丈夫ですか？"
    answer: "公式（@modelcontextprotocol）のサーバーを優先し、サードパーティのサーバーはGitHubでコードを確認してから使いましょう。APIキーは環境変数で管理し、データベース接続は読み取り専用の権限を使うことが推奨されます。"
  - question: "MCPサーバーをたくさん接続するとパフォーマンスに影響しますか？"
    answer: "Claude CodeにはTool Search機能があり、必要なツールだけを選択的に読み込むことでコンテキスト消費を約85%削減します。多数のMCPサーバーを接続してもパフォーマンスへの影響は少なくなっています。"
  - question: "MCPの初心者におすすめの始め方は？"
    answer: "まずはGitHub MCPサーバーだけ追加して、issue一覧の表示やPR作成などの操作を試してみましょう。慣れたらSlackやデータベースなど他のサーバーを追加していくのがおすすめです。"
---

「Claude Codeをもっと便利にしたい」「SlackやGitHubと連携できたら最高なのに」と思ったことはありませんか？MCPを使えば、Claude Codeの活用範囲を外部サービスにまで広げることができます。この記事ではMCPの仕組みから設定方法まで、初心者向けにやさしく解説します。

## MCPとは？Claude Codeと外部サービスをつなぐ仕組み

MCP（Model Context Protocol）は、Claude Codeと外部ツールを**つなぐための標準規格**です。

通常、Claude Codeはターミナル内のファイルやコマンドしか扱えません。しかしMCPを使えば、Slack、GitHub、データベース、Notionなど、さまざまな外部サービスと連携できます。

## MCPの仕組みをイメージで理解しよう

```
Claude Code ←→ MCP ←→ Slack
                    ←→ GitHub
                    ←→ データベース
                    ←→ Notion
```

MCPは「通訳」のような役割です。Claude Codeと外部サービスの間に入って、やり取りを仲介してくれます。

## MCPサーバーを追加するには？具体的な手順

ターミナルで以下のコマンドを実行します。

```bash
claude mcp add サーバー名 コマンド
```

### 例: GitHub MCPサーバーを追加

```bash
claude mcp add github npx @modelcontextprotocol/server-github
```

これで、Claude Codeから「このリポジトリのissue一覧を見せて」のような指示ができるようになります。

## どれを使うべき？人気MCPサーバー5選

| サーバー | 用途 | コマンド例 |
|---|---|---|
| **GitHub** | Issue・PR操作 | `npx @modelcontextprotocol/server-github` |
| **Slack** | メッセージ送受信 | `npx @modelcontextprotocol/server-slack` |
| **PostgreSQL** | DB操作 | `npx @modelcontextprotocol/server-postgres` |
| **Filesystem** | ファイルアクセス | `npx @modelcontextprotocol/server-filesystem` |
| **Brave Search** | Web検索 | `npx @modelcontextprotocol/server-brave-search` |

## Docker MCP Toolkitで手軽にセットアップ

Docker社が提供するMCP Toolkitを使うと、MCPサーバーのセットアップが簡単になります。

```bash
docker run -it --rm mcp-toolkit
```

コンテナ内でMCPサーバーが動くため、環境を汚さずに利用できます。

## Tool Search機能でコンテキスト消費を85%削減

Claude Codeには**Tool Search機能**があり、MCPサーバーのツール情報をすべて読み込む代わりに、必要なツールだけを選択的に読み込みます。

これにより、**コンテキスト消費を約85%削減**できます。たくさんのMCPサーバーを接続していても、パフォーマンスへの影響が少なくなります。

## MCPサーバー利用時のセキュリティ注意点

MCPサーバーは外部が作成したプログラムです。以下の点に注意してください。セキュリティ全般のベストプラクティスについては[セキュリティ対策ガイド](/articles/security-best-practices)も参照してください。

### 信頼できるサーバーのみ使う
- 公式（@modelcontextprotocol）のサーバーを優先
- サードパーティのサーバーはGitHubでコードを確認してから使う

### 権限を最小限にする
- データベースに接続する場合は、読み取り専用の権限を使う
- APIキーは必要最小限の権限で作成する

### 環境変数でAPIキーを管理
APIキーは環境変数で渡しましょう。コードやCLAUDE.mdにハードコーディングしないでください。

```bash
export GITHUB_TOKEN=your_token_here
claude mcp add github npx @modelcontextprotocol/server-github
```

## 初心者がMCPを始めるための3ステップ

1. まずは**GitHub MCPサーバー**だけ追加してみる
2. 「issue一覧を見せて」「PRを作って」などの操作を試す
3. 慣れたら他のサーバーを追加していく

## まとめ

- **MCPはClaude Codeと外部サービス（GitHub・Slack・DB・Notionなど）を連携させるための標準規格**
- **`claude mcp add`コマンドひとつで簡単にMCPサーバーを追加**でき、すぐに使い始められる
- **Tool Search機能によりコンテキスト消費を約85%削減**できるので、多数のサーバーを接続してもパフォーマンスへの影響は少ない
- **まずはGitHub MCPサーバーから始める**のがおすすめ

MCPをさらに高度に活用したい方は[MCPサーバー上級活用ガイド](/articles/mcp-server-advanced)を、Claude Codeの基本的な使い方をまだ学んでいない方は[Claude Codeとは？](/articles/what-is-claude-code)から始めましょう。
