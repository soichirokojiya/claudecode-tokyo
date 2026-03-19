---
title: "Claude Codeで最初のプロジェクトを作ろう｜ハンズオン入門"
description: "Claude Codeを使ってゼロからTodoアプリを作るハンズオンチュートリアル。実際のプロンプト例と出力結果を見ながらステップバイステップで学べます。"
date: "2026-03-20"
lastUpdated: "2026-03-20"
category: "getting-started"
priority: 50
thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&q=80"
tags: ["ハンズオン", "チュートリアル", "Next.js", "初心者", "Todoアプリ"]
summary:
  - "Claude Codeに指示するだけで、Next.js製のTodoアプリをゼロから構築できる"
  - "プロジェクト作成→機能追加→スタイリング→デプロイまでの全工程を体験する"
  - "実際のプロンプト例と出力結果をセットで掲載しているので迷わず進められる"
  - "段階的に指示を出すテクニックを身につけることで、複雑なアプリにも応用できる"
faq:
  - question: "プログラミング未経験でもこのチュートリアルを進められますか？"
    answer: "基本的なターミナル操作（cdコマンドなど）ができれば進められます。コードはClaude Codeが生成するので、プログラミング経験は必須ではありません。ただし、生成されたコードの意味を理解するためにJavaScriptの基礎知識があるとより楽しめます。"
  - question: "Next.js以外のフレームワークでも同じ方法で作れますか？"
    answer: "はい、Claude CodeはReact、Vue、Svelte、Express、Djangoなど幅広いフレームワークに対応しています。プロンプトのフレームワーク名を変更するだけで同様に進められます。"
  - question: "途中でエラーが出た場合はどうすればいいですか？"
    answer: "エラーメッセージをそのままClaude Codeに貼り付けてください。「このエラーを解決して」と伝えるだけで、原因の特定と修正を行ってくれます。"
  - question: "このチュートリアルにかかる時間はどのくらいですか？"
    answer: "環境が整っていれば30分から1時間程度です。Claude Codeの応答速度やネットワーク環境によって前後します。"
  - question: "作ったアプリを公開することはできますか？"
    answer: "はい、Vercelを使えば無料で公開できます。チュートリアルの最後にデプロイ方法も紹介しています。"
author: "ClaudeCode.Tokyo編集部"
---

## このチュートリアルで作るもの

Claude Codeを使いたいけど、何から始めればいいかわからない。
このチュートリアルでは、実際にTodoアプリを作りながらClaude Codeの使い方を体験します。
完成まで約30分、一緒に手を動かして学びましょう。

### 完成イメージ

今回作るTodoアプリの機能は以下の通りです。

| 機能 | 説明 |
|------|------|
| タスク追加 | テキスト入力でタスクを追加 |
| タスク完了 | チェックボックスで完了/未完了を切り替え |
| タスク削除 | 不要なタスクを削除 |
| フィルタリング | 全て/完了/未完了で絞り込み |
| ローカル保存 | ブラウザに自動保存 |

技術スタックはNext.js（App Router）+ TypeScript + Tailwind CSSです。

### 前提条件

以下が準備できていることを確認してください。

- Node.js 18以上がインストール済み
- Claude Codeがインストール済み
- ターミナルの基本操作ができる

まだの方は[Claude Codeのインストールガイド](/articles/install-guide-2026)を先にお読みください。

## ステップ1：プロジェクトを作成する

### 作業ディレクトリの準備

まず、プロジェクトを作るディレクトリに移動します。

```bash
mkdir ~/projects
cd ~/projects
```

### Claude Codeを起動する

ターミナルでClaude Codeを起動しましょう。

```bash
claude
```

起動したら、以下のプロンプトを入力します。

### プロンプト：プロジェクト作成

```
Next.jsでTodoアプリを作りたいです。
以下の条件でプロジェクトを初期化してください。

- プロジェクト名: todo-app
- Next.js App Router使用
- TypeScript
- Tailwind CSS
- src/ディレクトリ構成
```

### Claude Codeの動き

Claude Codeは以下の手順で処理を進めます。

```
I'll create a new Next.js project with your specifications.

> npx create-next-app@latest todo-app --typescript --tailwind
  --app --src-dir --use-npm

Creating a new Next.js app in /Users/you/projects/todo-app...

✓ Project created successfully!

Let me verify the structure...

> ls -la todo-app/src/

todo-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── ...
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

プロジェクトが作成されたら、ディレクトリに移動します。

```bash
cd todo-app
claude
```

### CLAUDE.mdを初期化する

新しいプロジェクトでは`/init`を実行しましょう。

```
> /init
```

Claude Codeがプロジェクト構造を分析して、CLAUDE.mdを生成します。

```
Analyzing project structure...

Created CLAUDE.md with:
- Next.js 15 App Router project
- TypeScript strict mode
- Tailwind CSS for styling
- npm as package manager
```

## ステップ2：Todoの型定義とデータ管理を作る

### プロンプト：データ構造の設計

```
Todoアプリの型定義とカスタムフックを作ってください。

Todoの型:
- id: string (UUID)
- text: string
- completed: boolean
- createdAt: Date

カスタムフック useTodos:
- todos一覧の管理
- 追加・削除・完了切り替え機能
- localStorageへの自動保存・復元
- フィルタリング（all/active/completed）
```

### Claude Codeの出力

Claude Codeは2つのファイルを生成します。

**src/types/todo.ts:**

```typescript
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';
```

**src/hooks/useTodos.ts:**

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterType } from '@/types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // localStorageから復元
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // localStorageに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    totalCount: todos.length,
    activeCount: todos.filter(t => !t.completed).length,
  };
}
```

ここでのポイントは「何を作るか」を明確に指示したことです。
具体的な型定義やメソッド名を伝えることで、意図通りのコードが生成されます。

## ステップ3：UIコンポーネントを作る

### プロンプト：コンポーネント生成

```
TodoアプリのUIコンポーネントを作ってください。
Tailwind CSSでスタイリングしてください。

作成するコンポーネント:
1. TodoInput - タスク入力フォーム
2. TodoItem - 個別のタスク表示
3. TodoFilter - フィルタボタン（全て/未完了/完了）
4. TodoList - タスク一覧

デザイン方針:
- シンプルでモダンなデザイン
- レスポンシブ対応
- ダークモード対応
- 完了タスクは取り消し線を表示
```

### Claude Codeの出力

Claude Codeは4つのコンポーネントファイルを生成します。

**src/components/TodoInput.tsx:**

```typescript
'use client';

import { useState, FormEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="flex-1 px-4 py-2 rounded-lg border
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2
          focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white
          rounded-lg hover:bg-blue-600
          transition-colors"
      >
        追加
      </button>
    </form>
  );
}
```

他のコンポーネントも同様に、指示通りの機能とスタイリングで生成されます。

ファイルの作成状況は以下のように表示されます。

```
Created 4 files:
  ✓ src/components/TodoInput.tsx
  ✓ src/components/TodoItem.tsx
  ✓ src/components/TodoFilter.tsx
  ✓ src/components/TodoList.tsx
```

## ステップ4：ページを組み立てる

### プロンプト：メインページ

```
src/app/page.tsxを更新して、作成したコンポーネントを
組み合わせたTodoアプリのメインページにしてください。

ヘッダーに「Todo App」のタイトルと残りタスク数を表示してください。
```

### Claude Codeの出力

**src/app/page.tsx:**

```typescript
'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoInput } from '@/components/TodoInput';
import { TodoFilter } from '@/components/TodoFilter';
import { TodoList } from '@/components/TodoList';

export default function Home() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    activeCount,
  } = useTodos();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900
      py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold
            text-gray-900 dark:text-white">
            Todo App
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            残り {activeCount} 件のタスク
          </p>
        </div>

        <div className="space-y-4">
          <TodoInput onAdd={addTodo} />
          <TodoFilter
            current={filter}
            onChange={setFilter}
          />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </main>
  );
}
```

## ステップ5：動作確認する

### プロンプト：開発サーバー起動

```
開発サーバーを起動して、ビルドエラーがないか確認してください。
```

### Claude Codeの出力

```
> npm run dev

   ▲ Next.js 15.x
   - Local: http://localhost:3000

 ✓ Ready in 2.1s
 ✓ No build errors detected
```

ブラウザで `http://localhost:3000` を開くと、Todoアプリが表示されます。

この時点で動作確認するべきポイントは以下の通りです。

| 確認項目 | 操作方法 |
|---------|---------|
| タスク追加 | テキストを入力して「追加」ボタンをクリック |
| タスク完了 | チェックボックスをクリック |
| タスク削除 | ゴミ箱アイコンをクリック |
| フィルタリング | 「全て」「未完了」「完了」ボタンをクリック |
| 保存確認 | ページをリロードしてデータが残っているか確認 |

## ステップ6：機能を追加する

基本機能が動いたら、さらに機能を追加してみましょう。

### プロンプト：機能拡張

```
Todoアプリに以下の機能を追加してください。

1. タスクのドラッグ＆ドロップ並べ替え
2. 完了タスクの一括削除ボタン
3. タスクの編集機能（ダブルクリックで編集モード）
4. キーボードショートカット（Ctrl+Enterで追加）
```

Claude Codeは既存コードを理解した上で、差分だけを修正してくれます。

```
I'll add these features to the existing components.

Updating 3 files:
  ✓ src/hooks/useTodos.ts (added reorder, clearCompleted)
  ✓ src/components/TodoItem.tsx (added edit mode, drag)
  ✓ src/components/TodoInput.tsx (added keyboard shortcut)

Installing dependency:
  > npm install @dnd-kit/core @dnd-kit/sortable
```

段階的に機能を追加する方法は、Claude Codeの効果的な使い方です。
最初からすべてを一度に指示するより、確認しながら進める方が確実です。

## ステップ7：テストを書く

### プロンプト：テスト作成

```
useTodosフックのユニットテストを書いてください。
Jest + React Testing Libraryを使ってください。

テストケース:
- タスクの追加
- タスクの完了切り替え
- タスクの削除
- フィルタリング
- localStorageへの保存
```

### Claude Codeの出力

```
Setting up test environment...

> npm install -D jest @testing-library/react
  @testing-library/jest-dom @types/jest
  jest-environment-jsdom

Created files:
  ✓ jest.config.ts
  ✓ src/hooks/__tests__/useTodos.test.ts

Running tests...

> npm test

 PASS  src/hooks/__tests__/useTodos.test.ts
  useTodos
    ✓ should add a new todo (12ms)
    ✓ should toggle todo completion (8ms)
    ✓ should delete a todo (6ms)
    ✓ should filter active todos (9ms)
    ✓ should filter completed todos (7ms)
    ✓ should save to localStorage (15ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

テストが全て通れば、コードの品質が確認できます。

## ステップ8：デプロイする

### プロンプト：Vercelデプロイ準備

```
このTodoアプリをVercelにデプロイする準備をしてください。
ビルドが通ることを確認して、必要な設定を追加してください。
```

### Claude Codeの出力

```
Checking build...

> npm run build

   ▲ Next.js 15.x
   Creating an optimized production build...
   ✓ Compiled successfully
   ✓ Linting and checking validity
   ✓ Collecting page data
   ✓ Generating static pages

   Route (app)              Size
   ┌ ○ /                    4.2 kB
   └ ○ /_not-found          871 B

   ✓ Build completed successfully!
```

ビルドが通ったら、Vercel CLIでデプロイできます。

```bash
npx vercel
```

## 学んだテクニックの振り返り

このチュートリアルで使ったClaude Codeのテクニックをまとめます。

### 効果的だったプロンプトのパターン

| パターン | 例 | 効果 |
|---------|-----|------|
| **条件リスト** | 箇条書きで要件を並べる | 漏れなく実装される |
| **型定義の指示** | 具体的なフィールド名を伝える | 意図通りの構造になる |
| **段階的な追加** | 基本→追加機能の順で指示 | 確認しながら進められる |
| **確認の依頼** | 「ビルドエラーがないか確認して」 | 問題を早期発見できる |

### 避けるべき指示の出し方

```
❌ 「いい感じのTodoアプリを作って」
→ 曖昧すぎて、意図と異なる結果になりやすい

✅ 「Next.js App RouterでTodoアプリを作って。
    TypeScript、Tailwind CSS使用。
    タスクの追加・完了・削除・フィルタ機能付き」
→ 具体的な条件があると、期待通りの結果が得られる
```

プロンプトの詳しいコツは[Claude Codeへの指示の出し方ガイド](/articles/prompt-techniques-beginners)で解説しています。

## まとめ

このチュートリアルで体験したことの要点です。

- **Claude Codeは段階的に指示する**のがコツ。一度にすべてを詰め込まない
- **具体的な要件を箇条書きで伝える**と、意図通りのコードが生成される
- **動作確認を挟みながら進める**ことで、手戻りを最小化できる
- **エラーが出たらそのまま貼り付ける**だけで、Claude Codeが修正してくれる
- ゼロからデプロイまで、**コードをほぼ書かずに完成**できる

次のステップとして、以下の記事もおすすめです。

- [Claude Codeの基本コマンド一覧](/articles/basic-commands-guide) - コマンドを体系的に学ぶ
- [CLAUDE.md活用ガイド](/articles/claude-md-guide) - プロジェクト設定を最適化する
- [Claude Codeへの指示の出し方ガイド](/articles/prompt-techniques-beginners) - プロンプト力を磨く
