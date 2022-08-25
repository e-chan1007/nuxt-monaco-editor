---
home: true

heroText: Nuxt Monaco Editor
tagline: The easist way to get along with Monaco Editor.

actions:
- text: Get Started
  link: /guide/getting-started
      
features:
- title: Zero Configuration
  details: All you have to do is to import the module in Nuxt Config.
- title: Localization
  details: Including Localization support, just switch on your config.
- title: Nuxt3 Ready
  details: Built on Vue 3, can use very easily by Auto-imports and Composables.
---

## Setup
1. Install dependencies
```sh
# npm
npm install -D monaco-editor nuxt-monaco-editor

# yarn
yarn add -D monaco-editor nuxt-monaco-editor

# pnpm
pnpm add -D monaco-editor nuxt-monaco-editor
```

2. Add this module to the Nuxt config
```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-monaco-editor'
  ]
})
```

3. Use the component in your pages or components
```vue
<template>
  <MonacoEditor lang="typescript" />
</template>
```
