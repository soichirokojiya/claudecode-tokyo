---
title: "MCPサーバー構築の実践ガイド：Claude Codeを拡張する"
description: "Model Context Protocol（MCP）サーバーの構築方法を実践的に解説。Claude Codeに独自ツールを追加し、外部サービスと連携する手順を網羅。"
date: "2026-03-01"
lastUpdated: "2026-03-20"
category: "tips"
thumbnail: "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=800&h=500&fit=crop&q=80"
tags: ["MCP", "サーバー構築", "開発", "拡張機能"]
summary:
  - "MCPサーバーを自作すればClaude Codeにデータベース操作・外部API呼び出しなど任意の機能を追加できる"
  - "TypeScript/Pythonの公式SDKを使えば最小限のコードでMCPサーバーを実装可能"
  - "セキュリティを考慮したツール設計とテスト方法を含む実践的な構築フローを解説"
faq:
  - question: "MCPサーバーとは何ですか？"
    answer: "Model Context Protocol（MCP）はAnthropicが策定したオープンプロトコルで、AIモデルが外部ツールやデータソースにアクセスするための標準規格です。MCPサーバーはこのプロトコルに準拠したサーバーで、Claude Codeに新しい機能（ツール）を提供します。"
  - question: "MCPサーバーの構築にはどの程度の技術力が必要ですか？"
    answer: "Node.jsまたはPythonの基礎知識があれば構築可能です。公式SDKがプロトコルの詳細を抽象化しているため、ツールの入出力を定義するだけで動作します。基本的なMCPサーバーなら50行程度のコードで実装できます。"
  - question: "MCPサーバーをチームで共有するにはどうすればよいですか？"
    answer: "MCPサーバーの設定はプロジェクトルートの.claude/mcp.jsonに記述します。このファイルをgitリポジトリに含めれば、チームメンバー全員が同じMCPサーバーを利用できます。npmパッケージとして公開する方法もあります。"
author: "ClaudeCode.Tokyo編集部"
---

「Claude Codeにデータベース検索やSlack通知の機能を追加したい」「社内システムと連携させたい」——MCPサーバーを自作すれば、それが実現できます。この記事では、TypeScriptを使ったMCPサーバーの構築から、Claude Codeへの登録、セキュリティ対策までを実践的に解説します。MCPの基本概念を先に理解したい方は、[MCP入門ガイド](/articles/mcp-beginners-guide)をご覧ください。

## MCPとは何か？Claude Codeを拡張するオープンプロトコル

**Model Context Protocol（MCP）**は、Anthropicが2024年11月に発表したオープンプロトコルです。AIモデルが外部のツールやデータソースにアクセスするための標準化された通信規格を定義しています。

MCPの登場以前は、各AIツールが独自の方法で外部連携を実装していました。MCPにより、**一度作ったサーバーはClaude Code、Claude Desktop、その他MCP対応クライアントで共通利用**できるようになっています。

## MCPサーバーはどんな構造になっている？3つの構成要素

MCPサーバーは以下の3つの要素で構成されます。

1. **ツール（Tools）** — Claude Codeが呼び出せる関数。データベースクエリ、API呼び出しなど
2. **リソース（Resources）** — 読み取り専用のデータソース。設定ファイル、ドキュメントなど
3. **プロンプト（Prompts）** — 再利用可能なプロンプトテンプレート

## TypeScriptでMCPサーバーを作ってみよう：ステップバイステップ

### セットアップ

```bash
mkdir my-mcp-server && cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

### 最小限のMCPサーバー

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-tools",
  version: "1.0.0",
});

// ツールの定義
server.tool(
  "search_database",
  "データベースからレコードを検索します",
  {
    query: z.string().describe("検索クエリ"),
    limit: z.number().default(10).describe("最大件数"),
  },
  async ({ query, limit }) => {
    // ここに実際のDB検索ロジック
    const results = await searchDB(query, limit);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }
);

// サーバー起動
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Claude Codeへの登録

構築したMCPサーバーをClaude Codeに登録するには、以下のコマンドを実行します。

```bash
claude mcp add my-tools node /path/to/my-mcp-server/dist/index.js
```

またはプロジェクトの`.claude/mcp.json`に直接記述します。

```json
{
  "mcpServers": {
    "my-tools": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/mydb"
      }
    }
  }
}
```

## 実務で役立つMCPサーバーの実装例

### 例1：社内ナレッジベース検索

社内のConfluenceやNotionからドキュメントを検索するMCPサーバーです。

```typescript
server.tool(
  "search_knowledge_base",
  "社内ナレッジベースを検索します",
  {
    query: z.string().describe("検索キーワード"),
    space: z.string().optional().describe("検索対象のスペース名"),
  },
  async ({ query, space }) => {
    const response = await fetch(
      `${CONFLUENCE_URL}/rest/api/content/search?cql=text~"${query}"`,
      { headers: { Authorization: `Bearer ${CONFLUENCE_TOKEN}` } }
    );
    const data = await response.json();
    return {
      content: [{ type: "text", text: formatResults(data) }],
    };
  }
);
```

### 例2：Slack通知送信

Claude Codeの作業完了時にSlackに通知を送るツールです。

```typescript
server.tool(
  "notify_slack",
  "Slackチャンネルにメッセージを送信します",
  {
    channel: z.string().describe("チャンネル名（#付き）"),
    message: z.string().describe("送信するメッセージ"),
  },
  async ({ channel, message }) => {
    await slackClient.chat.postMessage({
      channel,
      text: message,
    });
    return {
      content: [{ type: "text", text: `${channel}に送信しました` }],
    };
  }
);
```

## MCPサーバーのセキュリティで守るべき5つの原則

MCPサーバーを構築する際は、以下のセキュリティ原則を守ることが重要です。セキュリティ全般については[セキュリティベストプラクティス](/articles/security-best-practices)も参考にしてください。

- **最小権限の原則** — ツールに与える権限は必要最小限にする
- **入力バリデーション** — zodスキーマで入力を厳密に検証する
- **シークレット管理** — APIキーやトークンはenvフィールドで環境変数として渡す
- **ログ記録** — ツールの実行ログを記録し、監査可能にする
- **レート制限** — 外部APIへの呼び出し頻度を制限する

## MCPサーバーのテスト・デバッグはどうする？

MCPサーバーのテストには、Anthropicが提供する**MCP Inspector**が便利です。

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

ブラウザでインスペクターが開き、各ツールを手動で実行して動作を確認できます。

## まとめ

- **MCPサーバー**を自作すれば、Claude Codeにデータベース操作・外部API呼び出しなど任意の機能を追加可能
- **TypeScript/PythonのSDK**を使えば50行程度のコードから実装を始められる
- **`.claude/mcp.json`**に設定を記述すればチーム全体で共有可能
- **セキュリティ**は最小権限の原則・入力バリデーション・シークレット管理が必須
- **MCP Inspector**でテスト・デバッグを効率化できる

MCPの基本をまだ押さえていない方は[MCP入門ガイド](/articles/mcp-beginners-guide)から始めてください。企業環境での活用は[エンタープライズセキュリティ](/articles/enterprise-security-claude)の記事も参考になります。
