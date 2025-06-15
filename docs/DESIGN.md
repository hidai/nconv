# 設計文書

## システム概要

Number Converter (nconv) は、数値入力をリアルタイムで多様な形式に変換・解釈して表示するWebアプリケーションです。

## 要件

### 機能要件

1. **数値入力処理**
   - 10進数: `42`, `-123`, `1234567890`
   - 16進数: `0xFF`, `0x1A2B`, `0XDEADBEEF`
   - 2進数: `0b1010`, `0B11110000`
   - 8進数: `0o755`, `0O644`

2. **基本変換表示**
   - 2進数表記 (0b prefix付き)
   - 10進数表記
   - 16進数表記 (0x prefix付き)
   - SI単位 (K, M, G, T, P, E, Z, Y)
   - IEC単位 (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi)

3. **Unix時刻解釈**
   - 時間単位: seconds, milliseconds, microseconds, nanoseconds
   - 時刻表示: Local時刻, UTC時刻
   - 2次元表形式での表示

4. **Duration表記**
   - 時間単位: seconds, milliseconds, microseconds, nanoseconds
   - 表示形式: HH:MM:SS (24時間未満), YYYY/MM/DD HH:MM:SS (24時間以上)

### 非機能要件

1. **パフォーマンス**
   - リアルタイム変換 (debounce 300ms)
   - レスポンシブデザイン
   - 大きな数値の精度保持

2. **ユーザビリティ**
   - 一画面で全情報表示
   - 直感的なUI/UX
   - エラー状態の明確な表示

## アーキテクチャ

### コンポーネント構成

```
App
├── InputSection
│   └── NumberInput
└── ResultsSection
    ├── BasicConversions
    ├── UnixTimeTable
    └── DurationTable
```

### データフロー

1. ユーザー入力 → `NumberInput`
2. 入力値をパース → `parseNumber()`
3. 各種変換処理 → `convertToFormats()`
4. 結果表示 → 各結果コンポーネント

### 主要モジュール

1. **数値パーサー** (`src/utils/numberParser.ts`)
   - 入力文字列の解析
   - 各進数の検出と変換
   - エラーハンドリング

2. **変換エンジン** (`src/utils/converter.ts`)
   - 基本変換 (2進数, 10進数, 16進数)
   - SI/IEC単位変換
   - Unix時刻変換
   - Duration変換

3. **フォーマッター** (`src/utils/formatter.ts`)
   - 表示用文字列生成
   - 数値の桁区切り
   - 日時フォーマット

## 型定義

```typescript
// 基本的な数値型
interface ParsedNumber {
  value: bigint;
  originalInput: string;
  detectedBase: number;
  isValid: boolean;
  error?: string;
}

// 変換結果型
interface ConversionResult {
  binary: string;
  decimal: string;
  hex: string;
  si: string;
  iec: string;
}

// Unix時刻型
interface UnixTimeResult {
  seconds: { local: string; utc: string };
  milliseconds: { local: string; utc: string };
  microseconds: { local: string; utc: string };
  nanoseconds: { local: string; utc: string };
}

// Duration型
interface DurationResult {
  seconds: string;
  milliseconds: string;
  microseconds: string;
  nanoseconds: string;
}
```

## 実装上の考慮事項

### 精度の問題
- JavaScriptのNumber型の限界 (2^53 - 1)
- BigInt型の活用
- 浮動小数点数の扱い

### パフォーマンス最適化
- useCallback, useMemoの適切な使用
- 不要な再レンダリングの防止
- debounceによる計算頻度の制御

### エラーハンドリング
- 無効な入力の検出
- 数値範囲外の処理
- ユーザーフレンドリーなエラーメッセージ

## UI/UXデザイン

### レイアウト
- 上部: 入力フィールド (中央配置)
- 下部: 結果表示エリア (グリッドレイアウト)
- レスポンシブ対応 (モバイル/タブレット/デスクトップ)

### カラースキーム
- ダークモード対応
- ライトモード対応
- アクセシビリティ考慮

### インタラクション
- リアルタイム更新
- 結果のコピー機能 (将来的に)
- 入力履歴 (将来的に)

## 将来の拡張計画

1. **追加機能**
   - 浮動小数点数対応
   - 科学記数法対応
   - カスタム進数対応

2. **UI改善**
   - 結果のコピー機能
   - 入力履歴機能
   - テーマ切り替え

3. **パフォーマンス**
   - Web Workers活用
   - 計算結果のキャッシュ
   - 仮想化による表示最適化