# Number Converter (nconv)

リアルタイム数値変換・解釈Webアプリケーション

## 概要

様々な形式の数値入力に対して、多様な解釈・変換結果をリアルタイムで表示するWebアプリケーションです。プログラマーやエンジニアが日常的に行う数値の変換作業を効率化することを目的としています。

### 主要機能

- **多様な入力形式対応**: 10進数、16進数(0x)、2進数(0b)など
- **基本変換**: 2進数、10進数、16進数、SI/IEC単位表記
- **Unix時刻解釈**: sec/msec/usec/nsec × Local時刻/UTC時刻の2次元表示
- **時間duration表記**: HH:MM:SS形式（24時間超過時は日付付き）× 各時間単位

## 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: CSS3 (カスタムCSS)
- **リンター**: ESLint + TypeScript ESLint

## 開発環境のセットアップ

### 前提条件
- Node.js 18以上
- npm 9以上

### インストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# リンター実行
npm run lint
```

## プロジェクト構造

```
nconv/
├── docs/                   # プロジェクト文書
│   ├── DESIGN.md          # 設計文書
│   ├── TODO.md            # タスク管理
│   └── TECHNICAL_DEBT.md  # 技術的負債管理
├── src/
│   ├── components/        # Reactコンポーネント
│   ├── utils/            # ユーティリティ関数
│   ├── types/            # TypeScript型定義
│   ├── App.tsx           # メインアプリケーション
│   ├── App.css           # メインスタイル
│   ├── main.tsx          # エントリーポイント
│   └── index.css         # グローバルスタイル
├── public/               # 静的ファイル
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 開発ガイドライン

### コーディング規約
- TypeScriptの厳格モード使用
- ESLintルールに準拠
- Reactのフックを適切に使用
- パフォーマンスを考慮したリアルタイム更新

### 新機能の追加手順
1. `docs/DESIGN.md`で設計を確認
2. `docs/TODO.md`でタスクを確認
3. 必要に応じて型定義を`src/types/`に追加
4. ユーティリティ関数を`src/utils/`に実装
5. UIコンポーネントを`src/components/`に作成
6. メインアプリケーションに統合

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの作成を歓迎します。新機能の追加や改善提案がある場合は、まず設計文書を確認してください。