---
title: "Claude Code Hooksの使い方｜自動化ワークフロー入門"
description: "Claude Code Hooksでコード保存時の自動フォーマットやコミット前チェックを設定する方法を初心者向けに解説。"
date: "2026-03-12"
lastUpdated: "2026-03-20"
category: "tips"
thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=500&fit=crop&q=80"
tags: ["Hooks", "自動化", "ワークフロー"]
summary:
  - "HooksはClaude Codeの動作前後に自動でコマンドを実行する仕組みで、.claude/settings.jsonに設定する"
  - "PreToolUse・PostToolUse・Notification・Stopの4つのイベントに対応している"
  - "自動フォーマット、危険コマンドのブロック、コミット前テスト、Slack通知などの実用レシピがある"
  - "セキュリティリスクとパフォーマンス影響を考慮し、必要最小限の設定から始めるのが推奨"
faq:
  - question: "Claude Code Hooksとは何ですか？"
    answer: "Hooksは、Claude Codeの動作の前後に自動でシェルコマンドを実行する仕組みです。例えばファイル保存時に自動フォーマットしたり、コミット前にテストを実行したりできます。"
  - question: "Hooksはどこに設定しますか？"
    answer: ".claude/settings.jsonファイルに設定します。PreToolUse（ツール実行前）、PostToolUse（ツール実行後）、Notification（通知時）、Stop（セッション終了時）の4つのイベントに対してコマンドを登録できます。"
  - question: "Hooksにセキュリティ上のリスクはありますか？"
    answer: "はい、Hooksでは任意のシェルコマンドが実行されるため、信頼できないプロジェクトのHooks設定をそのまま使うのは危険です。設定内容を必ず確認してから利用してください。"
  - question: "Hooksを設定するとClaude Codeが遅くなりますか？"
    answer: "すべての操作にHooksを設定するとパフォーマンスに影響が出ることがあります。必要なものだけに絞って設定することが推奨されています。"
  - question: "Hooksのおすすめの始め方は？"
    answer: "まずはPostToolUseイベントでPrettierによる自動フォーマットを設定するのがおすすめです。効果を実感しやすく、設定もシンプルです。慣れたら危険コマンドのブロックやSlack通知などを追加していきましょう。"
---

「Claude Codeでファイルを保存するたびに手動でフォーマットするのが面倒」「危険なコマンドの実行を防ぎたい」と感じたことはありませんか？Hooksを使えば、Claude Codeの動作に自動化ルールを組み込めます。この記事では設定方法と実用レシピ5選を紹介します。

## Hooksとは？Claude Codeに自動化ルールを組み込む仕組み

Hooksは、Claude Codeの動作の前後に**自動でコマンドを実行する仕組み**です。

例えば、「ファイルを保存したら自動でフォーマットする」「コミット前にテストを実行する」といったルールを設定できます。

## Hooksはどこで設定する？settings.jsonの書き方

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

## どのタイミングで発火する？4つのイベント種類

| イベント | タイミング |
|---|---|
| **PreToolUse** | ツール実行の前 |
| **PostToolUse** | ツール実行の後 |
| **Notification** | 通知の送信時 |
| **Stop** | セッション終了時 |

## すぐに使えるHooksの実用レシピ5選

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

## Hooks利用時の注意点

### セキュリティに気をつける
Hooksでは任意のシェルコマンドが実行されます。信頼できないプロジェクトのHooks設定をそのまま使わないでください。セキュリティ全般については[セキュリティベストプラクティス](/articles/security-best-practices)も参考になります。

### パフォーマンスへの影響
すべての操作にHooksをつけると、Claude Codeの動作が遅くなることがあります。必要なものだけ設定しましょう。

## まとめ

- **Hooksは`.claude/settings.json`に設定するだけで、Claude Codeの動作前後にコマンドを自動実行**できる
- **PreToolUse・PostToolUse・Notification・Stopの4つのイベント**に対応
- **自動フォーマット、危険コマンドのブロック、コミット前テスト、Slack通知**などの実用レシピがすぐに使える
- **セキュリティとパフォーマンスを考慮し、必要最小限から始める**のがポイント

Hooksと組み合わせてさらに効率化したい方は、[カスタムスキルガイド](/articles/custom-skills-guide)や[生産性を3倍にするワークフロー10選](/articles/productivity-workflows)もあわせてお読みください。
