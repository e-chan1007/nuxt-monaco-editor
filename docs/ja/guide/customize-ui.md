# UIのカスタマイズ
## 言語の変更
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-monaco-editor'],
  monacoEditor: { lang: 'ja' }
})
```
このように設定すると、UIが日本語で表示されます。

使用可能な言語は[こちら](configuration#locale)に記載しています。

## テーマの変更
```vue
<template>
  <MonacoEditor :options="{ theme: 'vs-dark' }" />
</template>
```
このように設定すると、UIがダークモードで表示されます。
