---
title: "Claude Code MCP入門｜外部ツール連携の始め方"
description: "MCPを使えばClaude CodeをSlack・GitHub・DBと連携可能。初心者向けに設定方法とおすすめサーバーを紹介。"
date: "2026-03-11"
category: "tips"
tags: ["MCP", "連携", "外部ツール"]
---

## MCPとは？

MCP（Model Context Protocol）は、Claude Codeと外部ツールを**つなぐための標準規格**です。

通常、Claude Codeはターミナル内のファイルやコマンドしか扱えません。しかしMCPを使えば、Slack、GitHub、データベース、Notionなど、さまざまな外部サービスと連携できます。

## イメージ

```
Claude Code ←→ MCP ←→ Slack
                    ←→ GitHub
                    ←→ データベース
                    ←→ Notion
```

MCPは「通訳」のような役割です。Claude Codeと外部サービスの間に入って、やり取りを仲介してくれます。

## MCPサーバーの追加方法

ターミナルで以下のコマンドを実行します。

```bash
claude mcp add サーバー名 コマンド
```

### 例: GitHub MCPサーバーを追加

```bash
claude mcp add github npx @modelcontextprotocol/server-github
```

これで、Claude Codeから「このリポジトリのissue一覧を見せて」のような指示ができるようになります。

## 人気のMCPサーバー

| サーバー | 用途 | コマンド例 |
|---|---|---|
| **GitHub** | Issue・PR操作 | `npx @modelcontextprotocol/server-github` |
| **Slack** | メッセージ送受信 | `npx @modelcontextprotocol/server-slack` |
| **PostgreSQL** | DB操作 | `npx @modelcontextprotocol/server-postgres` |
| **Filesystem** | ファイルアクセス | `npx @modelcontextprotocol/server-filesystem` |
| **Brave Search** | Web検索 | `npx @modelcontextprotocol/server-brave-search` |

## Docker MCP Toolkitが便利

Docker社が提供するMCP Toolkitを使うと、MCPサーバーのセットアップが簡単になります。

```bash
docker run -it --rm mcp-toolkit
```

コンテナ内でMCPサーバーが動くため、環境を汚さずに利用できます。

## Tool Search機能でコスト削減

Claude Codeには**Tool Search機能**があり、MCPサーバーのツール情報をすべて読み込む代わりに、必要なツールだけを選択的に読み込みます。

これにより、**コンテキスト消費を約85%削減**できます。たくさんのMCPサーバーを接続していても、パフォーマンスへの影響が少なくなります。

## セキュリティの注意点

MCPサーバーは外部が作成したプログラムです。以下の点に注意してください。

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

## 初心者におすすめの始め方

1. まずは**GitHub MCPサーバー**だけ追加してみる
2. 「issue一覧を見せて」「PRを作って」などの操作を試す
3. 慣れたら他のサーバーを追加していく

## まとめ

MCPを使えば、Claude Codeが「ターミナル内のAI」から「あらゆるサービスと連携するAIアシスタント」に進化します。まずはGitHub連携から始めて、少しずつ活用範囲を広げていきましょう。
