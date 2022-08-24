# nuxt-monaco-editor
[![npm version](https://badge.fury.io/js/nuxt-monaco-editor.svg)](https://badge.fury.io/js/nuxt-monaco-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/3e17dc23119d4d5ea37ef3b58ce81ff9)](https://www.codacy.com/gh/e-chan1007/nuxt-monaco-editor/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=e-chan1007/nuxt-monaco-editor&amp;utm_campaign=Badge_Grade)

Integrate [monaco-editor](https://microsoft.github.io/monaco-editor/) with Nuxt

## Install
```sh
# npm
npm install -D monaco-editor nuxt-monaco-editor

# yarn
yarn add -D monaco-editor nuxt-monaco-editor

# pnpm
pnpm add -D monaco-editor nuxt-monaco-editor
```
Don't forget to install `monaco-editor`.

## Setup
1. Add this module to the Nuxt config 

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-monaco-editor'
  ]
})
```

2. (Optional) Configure the module 

```ts
export default defineNuxtConfig({
  monacoEditor: {
    // These are default values:
    locale: 'en',
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor'
    }
  }
})
```

3. Use the component in your pages or components 

```vue
<template>
  <MonacoEditor v-model="value" lang="typescript" />
</template>

<script lang="ts" setup>
const value = ref('')
</script>
```

## Development

- Run `npm run dev:prepare` to generate type stubs.  
- Use `npm run dev` to start [playground](./playground) in development mode.  
