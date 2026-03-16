---
title: "Claude Code Hooksとは？自動化ワークフローを作る方法"
description: "Hooks機能を使えば、Claude Codeの動作を自動でカスタマイズできます。初心者でもわかるように基本から解説。"
date: "2026-03-12"
category: "tips"
tags: ["Hooks", "自動化", "ワークフロー"]
---

## Hooksとは？

Hooksは、Claude Codeの動作の前後に**自動でコマンドを実行する仕組み**です。

例えば、「ファイルを保存したら自動でフォーマットする」「コミット前にテストを実行する」といったルールを設定できます。

## どこで設定する？

Hooksは `.claude/settings.json` に設定します。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "npx prettier --write $FILE_PATH"
      }
    ]
  }
}
```

この例では、Claude Codeがファイルを編集・作成するたびに、自動でPrettierによるフォーマットが実行されます。

## 主なイベント

| イベント | タイミング |
|---|---|
| **PreToolUse** | ツール実行の前 |
| **PostToolUse** | ツール実行の後 |
| **Notification** | 通知の送信時 |
| **Stop** | セッション終了時 |

## 実用的なレシピ5選

### 1. ファイル保存時に自動フォーマット

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "npx prettier --write $FILE_PATH"
      }
    ]
  }
}
```

### 2. 危険なコマンドをブロック

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "echo $COMMAND | grep -qE 'rm -rf|drop table|format' && echo 'BLOCKED' && exit 1 || exit 0"
      }
    ]
  }
}
```

`rm -rf` や `drop table` などの危険なコマンドを事前にブロックします。

### 3. コミット前にテスト実行

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit)",
        "command": "npm test"
      }
    ]
  }
}
```

### 4. Slack通知

```json
{
  "hooks": {
    "Stop": [
      {
        "command": "curl -X POST -H 'Content-Type: application/json' -d '{\"text\":\"Claude Codeの作業が完了しました\"}' $SLACK_WEBHOOK_URL"
      }
    ]
  }
}
```

セッション終了時にSlackに通知を送ります。

### 5. 変更ファイルの自動lint

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "npx eslint --fix $FILE_PATH"
      }
    ]
  }
}
```

## 注意点

### セキュリティに気をつける
Hooksでは任意のシェルコマンドが実行されます。信頼できないプロジェクトのHooks設定をそのまま使わないでください。

### パフォーマンスへの影響
すべての操作にHooksをつけると、Claude Codeの動作が遅くなることがあります。必要なものだけ設定しましょう。

## まとめ

Hooksを使えば、Claude Codeをプロジェクトのワークフローに合わせてカスタマイズできます。まずは「自動フォーマット」から始めて、徐々にレシピを増やしていくのがおすすめです。
