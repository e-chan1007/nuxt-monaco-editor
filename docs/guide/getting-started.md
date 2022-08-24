# Getting started
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

2. Use the component in your pages or components
```vue
<template>
  <MonacoEditor lang="typescript" />
</template>
```
