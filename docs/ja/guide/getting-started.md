# はじめる
## インストール
```sh
# npm
npm install -D monaco-editor nuxt-monaco-editor

# yarn
yarn add -D monaco-editor nuxt-monaco-editor

# pnpm
pnpm add -D monaco-editor nuxt-monaco-editor
```
`monaco-editor` のインストールを忘れないよう注意してください。

## セットアップ
1. モジュールをNuxtの設定に追加
```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-monaco-editor'
  ]
})
```

2. コンポーネントを読み込む
```vue
<template>
  <MonacoEditor lang="typescript" />
</template>
```
