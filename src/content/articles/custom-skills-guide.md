---
title: "カスタムスキルとスラッシュコマンドで自分だけのClaude Codeを作る完全ガイド"
description: "Claude Codeのカスタムスキル機能を徹底解説。SKILL.mdの書き方、.claude/skills/ディレクトリの構成、実践的なスキル作成例を紹介。"
date: "2026-03-16"
lastUpdated: "2026-03-16"
category: "tips"
thumbnail: "/images/articles/hooks.jpg"
tags: ["カスタムスキル", "スラッシュコマンド", "SKILL.md", "カスタマイズ", "Tips"]
author: "ClaudeCode.Tokyo編集部"
summary:
  - "カスタムスキルは.claude/skills/ディレクトリにSKILL.mdファイルを配置するだけで作成できる"
  - "スラッシュコマンド（/skill-name）でスキルを呼び出し、定型的な作業を高品質に自動化できる"
  - "SKILL.mdはYAMLフロントマター＋マークダウン本文の構成で、入力パラメータの定義も可能"
  - "チームでスキルを共有することで、Claude Codeの出力品質をプロジェクト全体で統一できる"
faq:
  - question: "カスタムスキルとCLAUDE.mdの違いは何ですか？"
    answer: "CLAUDE.mdはプロジェクト全体に適用される常時有効なルールや設定です。カスタムスキルはスラッシュコマンドで明示的に呼び出す特定タスク向けの手順書です。CLAUDE.mdが『常時適用のルール』、スキルが『必要な時に呼び出すレシピ』と考えると分かりやすいでしょう。"
  - question: "カスタムスキルはどこに保存しますか？"
    answer: "プロジェクトルートの.claude/skills/ディレクトリにSKILL.mdファイルとして保存します。ファイル名がスラッシュコマンド名になります（例: .claude/skills/create-component.md → /create-component）。"
  - question: "スキルにパラメータを渡すことはできますか？"
    answer: "はい。SKILL.mdのYAMLフロントマターでargsフィールドを定義することで、スラッシュコマンド実行時に引数を受け取れます。例えば /create-component Button のように使えます。"
  - question: "チームでスキルを共有するにはどうすればいいですか？"
    answer: ".claude/skills/ディレクトリをGitリポジトリに含めてコミットすれば、チーム全員が同じスキルを使えます。これにより、コード生成の品質をチーム全体で統一できます。"
  - question: "どんなスキルを作ると効果的ですか？"
    answer: "繰り返し行う定型作業が最適です。コンポーネント生成、APIエンドポイント作成、テストファイル生成、マイグレーション作成、ドキュメント更新などがよく作られるスキルです。"
---

## カスタムスキルとは

Claude Codeの**カスタムスキル**は、よく使う作業手順をスラッシュコマンドとして登録できる機能です。プロジェクト固有のコード生成パターンや、チームの規約に沿った定型作業を、一発のコマンドで高品質に実行できるようになります。

たとえば `/create-component Button` と入力するだけで、プロジェクトの規約に沿ったReactコンポーネントファイル、テストファイル、Storybookファイルを一括生成する——そんなワークフローが簡単に実現できます。

> 出典: [Claude Code公式ドキュメント — Custom Skills](https://docs.anthropic.com/en/docs/claude-code/skills)

## SKILL.mdの基本構造

カスタムスキルは`.claude/skills/`ディレクトリに配置するMarkdownファイルで定義します。

### ファイル構成

```
.claude/
  skills/
    create-component.md    → /create-component で呼び出し
    create-api-route.md    → /create-api-route で呼び出し
    generate-test.md       → /generate-test で呼び出し
```

### SKILL.mdの基本フォーマット

```markdown
---
name: "create-component"
description: "プロジェクト規約に沿ったReactコンポーネントを生成"
args: "component_name"
---

# Reactコンポーネント生成スキル

以下の手順でReactコンポーネントを生成してください。

## 生成するファイル
1. `src/components/{component_name}/{component_name}.tsx` - コンポーネント本体
2. `src/components/{component_name}/{component_name}.test.tsx` - テストファイル
3. `src/components/{component_name}/{component_name}.stories.tsx` - Storybook

## コーディング規約
- Function Componentを使用（Class Component不可）
- Props は interface で型定義
- CSS Modules を使用
- テストは React Testing Library を使用
```

### YAMLフロントマターの定義項目

| フィールド | 必須 | 説明 | 例 |
|-----------|------|------|-----|
| name | はい | スキルの識別名（スラッシュコマンド名） | "create-component" |
| description | はい | スキルの説明文 | "Reactコンポーネントを生成" |
| args | いいえ | 受け取る引数の名前 | "component_name" |

## 実践的なスキル作成例

### 例1: Reactコンポーネント生成スキル

プロジェクトの規約に完全準拠したコンポーネントを生成するスキルです。

```markdown
---
name: "create-component"
description: "プロジェクト規約に沿ったReactコンポーネントを生成する"
args: "component_name"
---

# コンポーネント生成ルール

## 必須要件
- TypeScriptで記述する
- Function Componentを使用する
- Propsはinterfaceで定義し、{component_name}Propsという命名にする
- デフォルトエクスポートを使用する
- CSS Modulesでスタイリングする

## ファイル生成
1. `src/components/{component_name}/{component_name}.tsx`
2. `src/components/{component_name}/{component_name}.module.css`
3. `src/components/{component_name}/{component_name}.test.tsx`
4. `src/components/{component_name}/index.ts`（re-export用）

## テスト要件
- React Testing Libraryを使用
- レンダリングテスト必須
- Props変更時の表示テスト必須
- アクセシビリティテスト（最低限のaria属性チェック）
```

**使い方:**
```
/create-component UserProfile
```

### 例2: APIエンドポイント生成スキル

Next.js App RouterのAPIルートを規約通りに生成するスキルです。

```markdown
---
name: "create-api-route"
description: "Next.js App RouterのAPIルートを生成する"
args: "route_path"
---

# APIルート生成ルール

## 生成するファイル
- `src/app/api/{route_path}/route.ts`

## 必須実装
- GET/POST/PUT/DELETEのうち必要なメソッドをエクスポート
- Zodによる入力バリデーション
- try-catchでエラーハンドリング
- NextResponseで統一的なレスポンス形式
- 認証チェック（getServerSession使用）

## レスポンス形式
{
  "success": boolean,
  "data": any | null,
  "error": string | null
}
```

### 例3: データベースマイグレーション生成スキル

```markdown
---
name: "create-migration"
description: "Prismaマイグレーションファイルを生成する"
args: "migration_name"
---

# マイグレーション生成ルール

## 手順
1. prisma/schema.prisma に必要なモデル変更を追加
2. 変更内容を説明するコメントを追加
3. リレーションの整合性を確認
4. インデックスの最適化を検討

## 命名規約
- テーブル名: PascalCase（単数形）
- カラム名: camelCase
- インデックス名: idx_{table}_{column}
```

## スキル作成のベストプラクティス

### 具体的であるほど品質が上がる

スキルの指示は具体的であるほど、Claude Codeの出力品質が向上します。

| 指示の品質 | 悪い例 | 良い例 |
|-----------|--------|--------|
| ファイル配置 | 「適切な場所に配置」 | 「src/components/{name}/{name}.tsx に配置」 |
| スタイリング | 「CSSを書く」 | 「CSS Modulesを使用、BEM命名規約」 |
| テスト | 「テストも書く」 | 「RTLで、render/click/props変更の3パターン」 |
| エラー処理 | 「エラーハンドリングする」 | 「try-catchでAppErrorクラスをthrow」 |
| 命名規約 | 「適切な名前をつける」 | 「PascalCaseでProps型は{Name}Props」 |

### チームで共有するスキルの管理

`.claude/skills/`ディレクトリをGitリポジトリに含めることで、チーム全員が同じスキルを使えます。

```
# .gitignore に含めない（コミット対象にする）
# .claude/skills/  ← これは書かない

# 個人設定は除外してもOK
.claude/settings.local.json
```

### スキルのバージョン管理

スキルの変更はPRでレビューすることを推奨します。スキルの品質がチーム全体のコード品質に直結するためです。

## CLAUDE.mdとの使い分け

| 観点 | CLAUDE.md | カスタムスキル |
|------|-----------|--------------|
| 適用タイミング | 常時自動適用 | スラッシュコマンドで明示的に呼び出し |
| 用途 | プロジェクト全体のルール・規約 | 特定タスクの手順書 |
| 粒度 | 広範囲（コーディング規約全体） | 狭い範囲（特定の生成パターン） |
| 例 | 「TypeScriptを使う」「テスト必須」 | 「/create-component でコンポーネント生成」 |
| 更新頻度 | 低い（方針変更時） | 高い（新パターン追加時） |

## 応用: スキルを組み合わせた開発ワークフロー

複数のスキルを順番に使うことで、機能開発の全工程を効率化できます。

```bash
# 1. コンポーネント生成
/create-component UserDashboard

# 2. APIルート生成
/create-api-route users/dashboard

# 3. テスト補完
/generate-test src/components/UserDashboard

# 4. ドキュメント生成
/create-docs UserDashboard
```

このように、プロジェクト固有の「正しい作り方」をスキルとして体系化しておくことで、チームメンバーの経験レベルに関わらず一定品質のコードを素早く生成できるようになります。

## まとめ

カスタムスキルは、Claude Codeを**自分たちのプロジェクトに最適化**するための強力な仕組みです。定型的な作業をスキル化することで、生産性の向上と品質の統一を同時に実現できます。

まずは最も頻繁に行う作業（コンポーネント生成など）から1つスキルを作成し、効果を実感してみてください。

> 出典: [Claude Code公式ドキュメント — Skills](https://docs.anthropic.com/en/docs/claude-code/skills)、[SkillsPlayground — Community Skills](https://github.com/anthropics/claude-code-skills)
