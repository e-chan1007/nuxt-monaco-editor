# nuxt-monaco-editor
Integrate [monaco-editor](https://microsoft.github.io/monaco-editor/) with Nuxt

## Install
```sh
# npm
npm install -D nuxt-monaco-editor

# yarn
yarn add -D nuxt-monaco-editor

# pnpm
pnpm add -D nuxt-monaco-editor
```

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

3. Use in your pages or components
```vue
<template>
  <MonacoEditor v-model="value" lang="typescript" />
</template>

<script type="ts" setup>
const value = ref('')
</script>
```

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
