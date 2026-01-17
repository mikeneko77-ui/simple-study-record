# 学習記録アプリ

学習内容と学習時間を記録・管理できるシンプルなWebアプリケーションです。

## 機能

- 学習内容と学習時間の登録
- 学習記録の一覧表示
- 学習記録の削除
- 合計学習時間の表示

## 技術スタック

- React 19
- Vite 7
- Supabase (データベース)
- Jest / React Testing Library (テスト)
- Firebase Hosting (デプロイ)

## 環境設定

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトルートに`.env`ファイルを作成し、以下の環境変数を設定してください。

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Supabaseのプロジェクト設定画面からURLとAnon Keyを取得できます。

## 起動方法

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 にアクセスしてください。

### その他のコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番用ビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm test` | テスト実行 |
| `npm run lint` | ESLint実行 |
