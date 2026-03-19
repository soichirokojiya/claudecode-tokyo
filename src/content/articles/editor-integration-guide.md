---
title: "Claude CodeとVS Code・エディタの連携ガイド｜併用のベストプラクティス"
description: "Claude CodeとVS Codeの併用ワークフロー、ターミナル統合の設定方法、Cursor・WindSurfとの違いと使い分けを解説。開発効率を最大化するエディタ連携術を紹介します。"
date: "2026-03-20"
lastUpdated: "2026-03-20"
category: "getting-started"
thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&q=80"
tags: ["VS Code", "エディタ連携", "Cursor", "WindSurf", "ワークフロー"]
summary:
  - "VS Codeの統合ターミナルでClaude Codeを起動すれば、コード確認と指示出しを同時に行える"
  - "Claude Codeはエディタに依存しないCLIツールなので、任意のエディタと組み合わせられる"
  - "CursorやWindSurfとはアプローチが異なり、Claude Codeはより自律的に大規模な変更を実行できる"
  - "エディタのGit連携とClaude Codeのコード生成を組み合わせると、レビューが効率化する"
faq:
  - question: "Claude CodeはVS Code以外のエディタでも使えますか？"
    answer: "はい、Claude CodeはCLIツールなので、ターミナルが使える環境ならどのエディタとも併用できます。Vim、Neovim、Emacs、IntelliJ IDEA、Sublime Textなど、すべてのエディタで利用可能です。"
  - question: "CursorとClaude Codeはどちらを使うべきですか？"
    answer: "用途によります。カーソル位置でのインライン補完やチャットが中心ならCursorが便利です。プロジェクト全体の大規模な変更や自律的なタスク実行にはClaude Codeが向いています。両方を併用するのも有効です。"
  - question: "VS Codeの拡張機能でClaude Codeに対応したものはありますか？"
    answer: "2026年3月時点で、Anthropic公式のVS Code拡張はありません。ただしVS Codeの統合ターミナルからClaude Codeを直接操作できるので、拡張機能がなくても快適に使えます。"
  - question: "Claude Codeで生成されたコードの差分はどう確認しますか？"
    answer: "VS CodeのSource Controlパネル（Gitタブ）で差分を確認できます。Claude Codeがファイルを変更すると、VS Codeが自動で変更を検知して差分表示します。"
  - question: "Claude Codeとエディタのターミナルで日本語入力に問題はありますか？"
    answer: "macOSのターミナル.appやVS Codeの統合ターミナルでは問題ありません。Windows環境ではWSL2ターミナルの使用を推奨します。iTerm2やWarp等のサードパーティターミナルも問題なく使えます。"
author: "ClaudeCode.Tokyo編集部"
---

## Claude Codeとエディタの関係

Claude Codeはターミナルで動くCLIツールです。
特定のエディタに縛られない自由さが特徴ですが、エディタとの併用で効率が大幅に上がります。
この記事では、VS Codeを中心にエディタ連携のベストプラクティスを解説します。

Claude Codeの基本操作については[基本コマンド一覧](/articles/basic-commands-guide)を参照してください。

## VS Code + Claude Codeの基本セットアップ

### ステップ1：VS Codeの統合ターミナルを開く

VS Codeで統合ターミナルを開く方法です。

| 操作 | ショートカット |
|------|-------------|
| ターミナルを開く | `` Ctrl+` `` (Mac: `` Cmd+` ``) |
| 新しいターミナル | `Ctrl+Shift+`` ` |
| ターミナルの分割 | `Cmd+\` |
| ターミナル間の移動 | `Cmd+Option+→` / `Cmd+Option+←` |

### ステップ2：Claude Codeを起動

統合ターミナルでClaude Codeを起動します。

```bash
claude
```

VS Codeのターミナルで起動すると、ワークスペースのルートディレクトリがそのまま作業ディレクトリになります。
`cd`で移動する必要がありません。

### ステップ3：画面レイアウトの最適化

効率的な画面レイアウトを紹介します。

**推奨レイアウト：**

```
┌──────────────────────────────────────┐
│  VS Code エディタ（コード確認用）      │
│                                      │
│  ┌─────────────┐ ┌────────────────┐  │
│  │ ファイル     │ │ コードエリア    │  │
│  │ エクスプローラ│ │               │  │
│  │             │ │               │  │
│  └─────────────┘ └────────────────┘  │
│                                      │
│  ┌──────────────────────────────────┐│
│  │ ターミナル（Claude Code）         ││
│  │ > Claude Codeへの指示...          ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

ターミナルパネルの高さは、画面の30-40%がちょうど良いです。
`Cmd+Shift+P`から「View: Toggle Panel Maximized」で最大化もできます。

## 実践ワークフロー

### ワークフロー1：コード生成 → 確認 → 修正

最も基本的な併用パターンです。

**手順：**

1. ターミナルのClaude Codeに指示を出す
2. エディタ側でファイルの変更をリアルタイムに確認
3. 問題があればClaude Codeに修正を依頼

```
> 新しいAPIエンドポイント /api/users を作ってください。
  GETでユーザー一覧、POSTでユーザー作成です。
```

Claude Codeがファイルを作成すると、VS Codeが自動検知します。
エディタ側のタブに変更されたファイルが表示されます。

### ワークフロー2：Git差分の確認

Claude Codeの変更内容をGitで確認するフローです。

**手順：**

1. Claude Codeにコード変更を依頼
2. VS CodeのSource Controlパネル（`Cmd+Shift+G`）を開く
3. 変更されたファイルの差分を確認
4. 問題があればClaude Codeに修正を依頼
5. 問題なければコミット

```
# Claude Codeに変更を依頼
> src/utils/api.tsのエラーハンドリングを改善してください

# VS Codeで差分を確認後、問題なければ
> 今の変更をコミットしてください。
  メッセージ: "fix: APIのエラーハンドリングを改善"
```

VS CodeのGit連携を活かすと、変更の確認が視覚的にできます。

### ワークフロー3：複数ターミナルの活用

ターミナルを分割して効率的に作業する方法です。

```
ターミナル1: Claude Code（メイン作業）
ターミナル2: 開発サーバー（npm run dev）
ターミナル3: テスト実行（npm test -- --watch）
```

VS Codeでは`Cmd+\`でターミナルを分割できます。
Claude Codeで変更を行い、隣のターミナルで即座に結果を確認できます。

**設定方法：**

```bash
# ターミナル1でClaude Codeを起動
claude

# ターミナル2で開発サーバーを起動（別のターミナルタブ）
npm run dev

# ターミナル3でテストウォッチを起動（別のターミナルタブ）
npm test -- --watch
```

## VS Codeの便利な設定

### 自動保存の有効化

Claude Codeがファイルを変更した後、VS Codeに即座に反映されるようにします。

`settings.json`に以下を追加します。

```json
{
  "files.autoSave": "onFocusChange",
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true
  }
}
```

### ターミナルのフォント設定

Claude Codeの出力を見やすくするフォント設定です。

```json
{
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.fontFamily": "'JetBrains Mono', 'Fira Code', monospace",
  "terminal.integrated.lineHeight": 1.4
}
```

### ターミナルのスクロールバック

長い出力を遡れるようにスクロールバッファを増やします。

```json
{
  "terminal.integrated.scrollback": 10000
}
```

### 推奨VS Code拡張機能

Claude Codeとの併用で役立つ拡張機能です。

| 拡張機能 | 用途 |
|---------|------|
| **GitLens** | 変更履歴の詳細表示 |
| **Error Lens** | エラーをインラインで表示 |
| **Todo Tree** | TODO/FIXMEコメントの一覧 |
| **Tailwind CSS IntelliSense** | Tailwindクラスの補完 |
| **Pretty TypeScript Errors** | TSエラーの可読性向上 |

## Cursor・WindSurfとの比較

### AIコーディングツールの分類

現在のAIコーディングツールは大きく2タイプに分かれます。

| タイプ | ツール例 | 特徴 |
|-------|---------|------|
| **エディタ組み込み型** | Cursor、WindSurf、GitHub Copilot | エディタ内で完結する |
| **CLI型** | Claude Code、Aider | ターミナルから操作する |

### Claude Code vs Cursor

```
Cursor:
├── エディタに統合されたAIアシスタント
├── インライン補完が高速
├── チャットでコード質問・生成
├── タブ補完による自動コード提案
└── 開いているファイルのコンテキストを利用

Claude Code:
├── ターミナルベースのCLIツール
├── プロジェクト全体を理解して作業
├── ファイルの作成・編集・削除を自律実行
├── シェルコマンドの実行も可能
└── 複数ファイルの大規模変更が得意
```

**使い分けの指針：**

| シーン | おすすめツール | 理由 |
|-------|-------------|------|
| 1行のコード補完 | Cursor | インライン補完が高速 |
| 関数の実装 | Cursor / Claude Code | どちらでも対応可能 |
| 新機能の追加（複数ファイル） | Claude Code | プロジェクト全体を把握して作業 |
| リファクタリング（大規模） | Claude Code | 複数ファイル横断の変更に強い |
| バグ調査 | Claude Code | ファイル間の依存関係を追跡できる |
| コードの部分修正 | Cursor | 該当箇所を選択して指示できる |

### Claude Code vs WindSurf

WindSurfはCursorと似た位置づけですが、独自の「Cascade」機能があります。

```
WindSurf:
├── Cursorに似たエディタ統合型
├── Cascade: 複数ステップの自動実行
├── コンテキスト認識が強力
└── UIベースの操作

Claude Code:
├── ターミナルベースの操作
├── CLAUDE.mdによるプロジェクト設定
├── より柔軟なコマンド実行
└── CI/CDパイプラインとの統合が容易
```

### 併用のすすめ

実は、これらのツールは排他的ではありません。
併用することで、それぞれの強みを活かせます。

**おすすめの併用パターン：**

```
日常のコーディング: Cursor（インライン補完）
   ↓
新機能の実装: Claude Code（複数ファイル生成）
   ↓
微調整・修正: Cursor（ピンポイント編集）
   ↓
テスト・デプロイ: Claude Code（コマンド実行）
```

各ツールの詳しい比較は[Claude Code vs Cursor vs Copilot徹底比較](/articles/claude-code-vs-cursor-vs-copilot)も参照してください。

## ターミナル選択のポイント

### macOSの場合

| ターミナル | Claude Codeとの相性 | 特徴 |
|-----------|-------------------|------|
| **VS Code統合** | 良好 | エディタと一体で使える |
| **iTerm2** | 良好 | 高機能、分割表示が便利 |
| **Warp** | 良好 | モダンUI、AI機能内蔵 |
| **ターミナル.app** | 良好 | macOS標準、軽量 |

### Windowsの場合

| ターミナル | Claude Codeとの相性 | 特徴 |
|-----------|-------------------|------|
| **WSL2ターミナル** | 最も推奨 | Linux環境で安定動作 |
| **Windows Terminal** | 良好 | WSL2と組み合わせる |
| **VS Code統合(WSL)** | 良好 | Remote WSL拡張と併用 |
| **PowerShell** | 注意が必要 | 日本語文字化けの可能性 |

Windows環境では、WSL2の利用を強く推奨します。
詳しくは[インストールガイド](/articles/install-guide-2026)のWindows編を参照してください。

## 効率的な作業のコツ

### コツ1：エディタで確認、ターミナルで指示

役割を明確に分けましょう。

```
エディタの役割:
- コードの閲覧・確認
- Git差分の確認
- エラー箇所の特定
- 検索（Cmd+Shift+F）

Claude Codeの役割:
- コードの生成・修正
- ファイルの作成・削除
- テストの実行
- ビルドの確認
```

### コツ2：ファイルパスを活用する

VS Codeのファイルパスをコピーして、Claude Codeに渡しましょう。

```
VS Codeでファイルを右クリック
→ 「相対パスのコピー」
→ Claude Codeに貼り付け

> src/components/Header.tsxのナビゲーションメニューに
  「ブログ」リンクを追加してください
```

正確なファイルパスを渡すと、Claude Codeが迷わず対象ファイルを特定できます。

### コツ3：エラーのコピペ

VS Codeの「問題」パネル（`Cmd+Shift+M`）のエラーをコピーして、Claude Codeに渡しましょう。

```
> 以下のTypeScriptエラーを修正してください:

  src/hooks/useAuth.ts(23,5): error TS2322:
  Type 'string | undefined' is not assignable
  to type 'string'.
```

エラーメッセージにはファイル名と行番号が含まれています。
Claude Codeが正確に問題箇所を特定できます。

### コツ4：ターミナルの使い分け

複数のターミナルタブを目的別に使い分けます。

```bash
# ターミナル名を設定できるエディタもある
Tab 1: "Claude"   → Claude Code本体
Tab 2: "Server"   → npm run dev
Tab 3: "Test"     → npm test --watch
Tab 4: "Git"      → git操作用
```

## まとめ

Claude Codeとエディタ連携のポイントです。

- **VS Codeの統合ターミナル**でClaude Codeを起動するのが最も手軽
- **エディタで確認、Claude Codeで実行**の役割分担が効率的
- **Git差分の視覚的確認**でClaude Codeの変更内容を安全にレビューできる
- **Cursor/WindSurfとは競合ではなく併用**がおすすめ
- **ターミナルの分割**でサーバー・テスト・Claude Codeを同時に操作できる

次のステップとして、以下の記事もおすすめです。

- [Claude Codeで最初のプロジェクトを作ろう](/articles/first-project-tutorial) - 実践で併用を体験する
- [Claude Codeへの指示の出し方ガイド](/articles/prompt-techniques-beginners) - 効率的な指示法を学ぶ
- [Claude Codeとは？](/articles/what-is-claude-code) - 基本を復習する
