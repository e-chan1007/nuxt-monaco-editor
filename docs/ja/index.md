---
home: true

heroText: Nuxt Monaco Editor
tagline: The easiest way to get along with Monaco Editor.

actions:
- text: はじめる
  link: /ja/guide/getting-started

features:
- title: 設定不要
  etails: Nuxtの設定でモジュールを読み込むだけで利用できます。
- title: 翻訳
  details: 設定を1か所変更するだけで言語を変更できます。
- title: Nuxt3対応
  details: 自動インポートとコンポーサブルによってより簡単に利用できます。
---

## セットアップ

1. 依存関係のインストール

```sh
# npm
npm install -D monaco-editor nuxt-monaco-editor

# yarn
yarn add -D monaco-editor nuxt-monaco-editor

# pnpm
pnpm add -D monaco-editor nuxt-monaco-editor
```

2. モジュールを Nuxt の設定に追加

```ts
export default defineNuxtConfig({
  modules: ["nuxt-monaco-editor"],
});
```

3. コンポーネントを読み込む

```vue
<template>
  <MonacoEditor lang="typescript" />
</template>
```
