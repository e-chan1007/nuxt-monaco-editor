# Configuration
```ts
export interface ModuleOptions {
  dest?: string,
  locale?: MonacoEditorLocale,
  componentName?: {
    codeEditor?: string,
    diffEditor?: string
  }
}

const DEFAULTS: ModuleOptions = {
  dest: '_monaco',
  locale: 'en',
  componentName: {
    codeEditor: 'MonacoEditor',
    diffEditor: 'MonacoDiffEditor'
  }
}
```

## `dest`

Set where monaco-editor should be placed after build. This path will append to `app.baseURL` of nuxt.config.

## `locale`

Set UI Locale. 

Available locales are `de`, `en`, `es` , `fr`, `it`, `ja`, `ko`, `ru`, `zh-cn`, `zh-tw` (the same as monaco-editor's).

## `componentName`

Change component name as you want.

`codeEditor` for [`<MonacoEditor>`](../references/monaco-editor), `diffEditor` for [`<MonacoDiffEditor>`](../references/monaco-diff-editor).
