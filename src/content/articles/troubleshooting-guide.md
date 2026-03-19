---
title: "Claude Codeでよくあるエラーと解決法｜トラブルシューティング完全ガイド"
description: "Claude Codeで発生するよくあるエラーの原因と解決法を網羅的に解説。permission denied、rate limit、token limit、日本語入力の問題、認証エラーなどの対処法を紹介します。"
date: "2026-03-20"
lastUpdated: "2026-03-20"
category: "getting-started"
thumbnail: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&h=500&fit=crop&q=80"
tags: ["トラブルシューティング", "エラー解決", "初心者", "FAQ"]
summary:
  - "Claude Codeの主要エラーは認証系・権限系・トークン系・ネットワーク系の4カテゴリに分類できる"
  - "permission deniedはnpmの権限設定かsudoの使い方で解決できる"
  - "rate limitに遭遇したら数分待つか、/compactでトークンを節約する"
  - "日本語入力の問題はCLAUDE.mdの設定とターミナル選択で解決可能"
faq:
  - question: "Claude Codeが突然動かなくなりました。何を確認すべきですか？"
    answer: "まず/doctorコマンドで環境診断を実行してください。次にインターネット接続を確認し、claude --versionでバージョンを確認します。最新版でない場合はnpm update -g @anthropic-ai/claude-codeでアップデートしてください。"
  - question: "API利用時にコストが予想以上にかかっています。どうすれば節約できますか？"
    answer: "/costで現在の使用量を確認し、/compactで会話を圧縮してトークンを節約しましょう。また、簡単なタスクはHaikuモデルに切り替えるとコストを大幅に削減できます。"
  - question: "Claude Codeがファイルを勝手に書き換えて困っています"
    answer: "/permissionsコマンドでFile writeの権限を「ask」に設定してください。これにより、ファイル書き込み前に必ず確認が入ります。重要な操作はEscキーで中断することもできます。"
  - question: "Windows環境で文字化けが発生します"
    answer: "WSL2（Windows Subsystem for Linux）の利用を推奨します。PowerShellではSJISエンコーディングの問題で日本語が文字化けすることがあります。Windows Terminalの文字コード設定をUTF-8に変更することでも改善できます。"
  - question: "Claude Codeのアップデート方法を教えてください"
    answer: "npm update -g @anthropic-ai/claude-codeで最新版にアップデートできます。claude --versionで現在のバージョンを確認できます。メジャーアップデートの場合はnpm install -g @anthropic-ai/claude-code@latestを使ってください。"
author: "ClaudeCode.Tokyo編集部"
---

## トラブルシューティングの進め方

Claude Codeを使っていて、エラーに遭遇して手が止まってしまった。
そんなとき、この記事を見れば解決策が見つかります。
よくあるエラーを4つのカテゴリに分類して、それぞれの原因と解決法を解説します。

まだClaude Codeをインストールしていない方は、先に[インストールガイド](/articles/install-guide-2026)を参照してください。

### エラーの4つのカテゴリ

| カテゴリ | 主な原因 | 発生頻度 |
|---------|---------|---------|
| **認証・ログイン系** | アカウント・認証切れ | 高い |
| **権限・パーミッション系** | ファイル・コマンド権限 | 高い |
| **トークン・レート制限系** | 使用量の超過 | 中程度 |
| **ネットワーク・環境系** | 接続・設定の問題 | 低い |

## 認証・ログイン系のエラー

### エラー：Authentication failed

```
Error: Authentication failed. Please run /login to re-authenticate.
```

**原因：**
認証トークンの有効期限が切れています。
長時間のセッションや、ブラウザのCookie削除後に発生します。

**解決法：**

```bash
# Claude Code内で再認証
> /login

# ブラウザが開くので、Claudeアカウントでログイン
# 「Authentication successful!」と表示されれば完了
```

### エラー：Subscription required

```
Error: An active Pro subscription is required.
Please upgrade at https://claude.ai/settings/billing
```

**原因：**
Claude Proプラン（月$20）以上への加入が必要です。
無料プランではClaude Codeを利用できません。

**解決法：**

1. [claude.ai/settings/billing](https://claude.ai/settings/billing)にアクセス
2. Proプラン以上にアップグレード
3. `claude`コマンドで再度起動

| プラン | 月額 | Claude Code利用 |
|-------|------|---------------|
| Free | $0 | 利用不可 |
| Pro | $20 | 利用可能 |
| Team | $25/人 | 利用可能 |
| Enterprise | 要問合せ | 利用可能（管理機能付き） |

### エラー：Browser popup blocked

```
Error: Could not open browser for authentication.
Please check your popup blocker settings.
```

**原因：**
ブラウザのポップアップブロッカーが認証ウィンドウを阻止しています。

**解決法：**

1. ブラウザのポップアップブロック設定を確認
2. `localhost`または`127.0.0.1`を許可リストに追加
3. 再度`/login`を実行

```bash
# 手動でURLを開く場合
# Claude Codeが表示するURLをコピーしてブラウザに貼り付け
```

## 権限・パーミッション系のエラー

### エラー：Permission denied（インストール時）

```
npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**原因：**
npmのグローバルインストールに管理者権限が必要です。

**解決法（方法1）：sudoを使う**

```bash
sudo npm install -g @anthropic-ai/claude-code
```

**解決法（方法2）：npmの権限を変更（推奨）**

```bash
# npmのグローバルディレクトリを変更
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# パスを通す（.zshrcまたは.bashrcに追加）
export PATH=~/.npm-global/bin:$PATH

# 再インストール
npm install -g @anthropic-ai/claude-code
```

方法2の方が安全です。
sudoでnpmを使い続けると、他のパッケージで権限の問題が連鎖することがあります。

### エラー：Permission denied（ファイル操作時）

```
Error: Permission denied. Claude Code needs permission to write to this file.
Allow? [y/n]
```

**原因：**
Claude Codeの権限設定で、ファイル書き込みが「ask」になっています。

**解決法：**

```bash
# その場で許可する
y  # Enter

# 今後の同種の操作を自動許可にする場合
> /permissions

# File writeを「allowed」に変更
```

| 設定 | 動作 | おすすめ |
|------|------|---------|
| **ask** | 毎回確認 | 初心者向け |
| **allowed** | 自動許可 | 慣れた方向け |
| **denied** | 拒否 | セキュリティ重視 |

### エラー：Shell command not allowed

```
Error: Shell command execution is not permitted.
```

**原因：**
シェルコマンドの実行権限がありません。

**解決法：**

```bash
> /permissions

# Shell executeを「ask」または「allowed」に変更
```

初心者のうちは「ask」がおすすめです。
実行前にコマンドの内容を確認してから許可できます。

## トークン・レート制限系のエラー

### エラー：Rate limit exceeded

```
Error: Rate limit exceeded. Please wait a moment before retrying.
```

**原因：**
短時間にリクエストを送りすぎています。
Proプランでも一定の使用制限があります。

**解決法：**

```bash
# 数分待ってから再度実行
# 待っている間にやるべきこと:

# 1. トークン使用量を確認
> /cost

# 2. 会話を圧縮して効率化
> /compact

# 3. 必要なら会話をクリア
> /clear
```

**レート制限を予防するコツ：**

| 対策 | 効果 |
|------|------|
| `/compact`をこまめに実行 | トークン消費を削減 |
| 不要な会話は`/clear`でリセット | 使用量をリセット |
| 簡単なタスクはHaikuモデルを使用 | 制限に余裕ができる |
| 一度に大量の指示を避ける | リクエスト頻度を下げる |

### エラー：Context window exceeded

```
Error: Conversation exceeds the context window limit.
Please use /compact or /clear to reduce the conversation size.
```

**原因：**
会話が長くなりすぎて、コンテキストウィンドウの上限に達しました。

**解決法：**

```bash
# 方法1: 会話を圧縮する
> /compact

# 方法2: 特定の情報だけ残して圧縮
> /compact 直近のAPI実装の議論だけ残して

# 方法3: 会話を完全にリセット
> /clear
```

**予防策：**

長い会話を続ける場合は、定期的に`/compact`を実行しましょう。
目安として、`/cost`で確認してトークンが10万を超えたら圧縮を検討します。

```bash
# 定期的なメンテナンスルーティン
> /cost            # 使用量を確認
> /compact         # 圧縮が必要なら実行
> /status          # 圧縮後の状態を確認
```

### エラー：Output truncated

```
[Output truncated due to length limit]
```

**原因：**
Claude Codeの出力がトークン上限に達して途中で切れています。

**解決法：**

```bash
# 続きを表示させる
> 続きを出力してください

# または、出力をファイルに書かせる
> 結果をoutput.mdに書き出してください
```

長いコードの生成では、ファイル出力を指定すると安全です。

## ネットワーク・環境系のエラー

### エラー：Network error

```
Error: Network error. Could not connect to the API.
```

**原因：**
インターネット接続に問題があるか、APIサーバーに障害が発生しています。

**解決法：**

```bash
# 1. インターネット接続を確認
ping api.anthropic.com

# 2. DNSの問題を確認
nslookup api.anthropic.com

# 3. プロキシ設定を確認（企業ネットワークの場合）
echo $HTTP_PROXY
echo $HTTPS_PROXY
```

**プロキシ環境での設定：**

企業ネットワークでプロキシが必要な場合は、環境変数を設定します。

```bash
# .zshrcまたは.bashrcに追加
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1
```

### エラー：Node.js version too old

```
Error: Node.js 18 or higher is required. Current version: 16.x.x
```

**原因：**
Node.jsのバージョンが古すぎます。

**解決法：**

```bash
# 現在のバージョンを確認
node --version

# nvmを使っている場合
nvm install --lts
nvm use --lts

# Homebrewを使っている場合（Mac）
brew install node

# 直接ダウンロードする場合
# https://nodejs.org/ から最新LTS版をダウンロード
```

### エラー：CLAUDE.md not found

```
Warning: No CLAUDE.md found in current directory.
Run /init to create one.
```

**原因：**
現在のディレクトリにCLAUDE.mdがありません。
エラーではなく警告ですが、作成しておくと便利です。

**解決法：**

```bash
# CLAUDE.mdを自動生成
> /init

# 手動で作成する場合
# プロジェクトのルートに CLAUDE.md を作成
```

CLAUDE.mdの書き方は[CLAUDE.md活用ガイド](/articles/claude-md-guide)を参照してください。

## 日本語関連の問題

### 問題：日本語で応答されない

Claude Codeが英語で応答する場合があります。

**解決法：**

CLAUDE.mdに以下を追記します。

```markdown
## 言語設定
- すべての応答は日本語で行うこと
- コードのコメントも日本語で書くこと
- エラーメッセージの説明は日本語で行うこと
```

または、プロンプトの冒頭で指定します。

```
（日本語で回答してください）
src/app/page.tsxにヒーローセクションを追加してください。
```

### 問題：Windows PowerShellでの文字化け

PowerShellで日本語が正しく表示されない場合があります。

**解決法（方法1）：WSL2を使う（推奨）**

```bash
# WSL2をインストール
wsl --install

# WSL2のターミナルでClaude Codeを使用
```

**解決法（方法2）：PowerShellの文字コードを変更**

```powershell
# PowerShellの文字コードをUTF-8に変更
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001
```

**解決法（方法3）：Windows Terminalの設定**

```json
// settings.jsonに追加
{
  "profiles": {
    "defaults": {
      "encoding": "utf-8"
    }
  }
}
```

### 問題：日本語ファイル名の取り扱い

日本語を含むファイル名やパスでエラーが出る場合があります。

```
Error: ENOENT: no such file or directory, open '文書/レポート.md'
```

**解決法：**

- ファイル名とディレクトリ名は英数字を使用する
- 日本語が必要な場合はファイルの中身に日本語を使い、ファイル名は英語にする

```
❌ /ドキュメント/レポート.md
✅ /documents/report.md（中身は日本語）
```

## インストール・アップデートの問題

### 問題：インストールが途中で止まる

```bash
npm install -g @anthropic-ai/claude-code
# ... 長時間応答なし
```

**解決法：**

```bash
# npmのキャッシュをクリア
npm cache clean --force

# レジストリを確認
npm config get registry
# https://registry.npmjs.org/ であることを確認

# タイムアウトを延長して再実行
npm install -g @anthropic-ai/claude-code --fetch-timeout=60000
```

### 問題：バージョンの不整合

```
Error: Incompatible version. Please update Claude Code.
```

**解決法：**

```bash
# 現在のバージョンを確認
claude --version

# 最新版にアップデート
npm update -g @anthropic-ai/claude-code

# それでも解決しない場合は再インストール
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code@latest
```

### 問題：複数のNode.jsバージョンが競合

nvmやnodenvで複数バージョンを管理している場合に発生します。

```bash
# 使用中のNode.jsを確認
which node
node --version

# nvmの場合、デフォルトを設定
nvm alias default 22
nvm use default

# Claude Codeを再インストール
npm install -g @anthropic-ai/claude-code
```

## Claude Codeが予期しない動作をするとき

### 問題：意図と違うファイルを編集する

Claude Codeが関係ないファイルを変更してしまうことがあります。

**対処法：**

1. **Escキーで即座に中断する**
2. **Git差分で変更を確認する**

```bash
# 変更されたファイルを確認
git diff --name-only

# 意図しない変更を元に戻す
git checkout -- src/unintended-file.ts
```

3. **指示を具体的にやり直す**

```
> src/components/Header.tsxのみを変更してください。
  他のファイルは変更しないでください。
  ナビゲーションに「お問い合わせ」リンクを追加してください。
```

「〜のみ」「他のファイルは変更しない」と明示することで防げます。

### 問題：無限ループのような動作

Claude Codeが同じ操作を繰り返す場合があります。

**対処法：**

1. **Escキーで中断する**
2. **`/clear`で会話をリセットする**
3. **指示を変えてやり直す**

```bash
# 中断後
> /clear

# 別のアプローチで指示
> 先ほどの方法ではうまくいかなかったので、
  別のアプローチで実装してください。
  具体的には...
```

### 問題：古い情報に基づいたコードが生成される

Claude Codeのモデルには知識のカットオフがあります。
最新のライブラリAPIが変更されている場合があります。

**対処法：**

```
> Next.js 15のApp Routerの書き方で実装してください。
  公式ドキュメントのパターンに従ってください。

  参考: Server Componentsがデフォルトで、
  クライアント側の処理には'use client'が必要です。
```

正しい情報をプロンプトに含めることで、正確なコードが生成されます。

## トラブル発生時のチェックリスト

問題が起きたら、以下の順番で確認しましょう。

```
□ /doctor で環境を診断する
□ claude --version でバージョンを確認する
□ インターネット接続を確認する
□ Node.jsのバージョンが18以上か確認する
□ /login で認証状態を確認する
□ npm update -g @anthropic-ai/claude-code で最新版にする
□ /clear で会話をリセットして再試行する
□ ターミナルを再起動して再試行する
```

それでも解決しない場合は、以下のリソースを活用してください。

| リソース | URL | 用途 |
|---------|-----|------|
| GitHub Issues | github.com/anthropics/claude-code/issues | バグ報告・既知の問題検索 |
| Anthropic公式ドキュメント | docs.anthropic.com | 公式情報の確認 |
| `/bug`コマンド | Claude Code内で実行 | バグレポートの送信 |

## まとめ

Claude Codeのトラブルシューティングの要点です。

- **認証エラー**は`/login`で再認証するのが最初のステップ
- **権限エラー**は`/permissions`で設定を確認・変更する
- **トークン制限**は`/compact`と`/cost`で管理する
- **日本語の問題**はCLAUDE.mdの設定とWSL2の利用で解決できる
- **困ったら`/doctor`**で環境診断から始める

次のステップとして、以下の記事もおすすめです。

- [Claude Codeの基本コマンド一覧](/articles/basic-commands-guide) - コマンドを体系的に学ぶ
- [Claude Codeとは？](/articles/what-is-claude-code) - 基本を復習する
- [Claude Codeへの指示の出し方ガイド](/articles/prompt-techniques-beginners) - エラーを減らすプロンプト術
