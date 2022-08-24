# Customize UI
## Change UI Locale
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-monaco-editor'],
  monacoEditor: { lang: 'ja' }
})
```
Will show (almost) all UI text in Japanese.

Available locales are listed [here](configuration#locale).

## Change UI Theme
```ts
<MonacoEditor :options="{ theme: 'vs-dark' }" />
```
Will show UI in dark mode. 
