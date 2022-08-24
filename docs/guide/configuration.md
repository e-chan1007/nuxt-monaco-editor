# Configuration
```ts
export interface ModuleOptions {
  locale?: MonacoEditorLocale,
  componentName?: {
    codeEditor?: string,
    diffEditor?: string
  }
}

const DEFAULTS: ModuleOptions = {
  locale: 'en',
  componentName: {
    codeEditor: 'MonacoEditor',
    diffEditor: 'MonacoDiffEditor'
  }
}
```

## `locale`

Set UI Locale. 

Available locales are `de`, `en`, `es` , `fr`, `it`, `ja`, `ko`, `ru`, `zh-cn`, `zh-tw` (the same as monaco-editor's).

## `componentName`

Change component name as you want.

`codeEditor` for [`<MonacoEditor>`](../references/monaco-editor), `diffEditor` for [`<MonacoDiffEditor>`](../references/monaco-diff-editor), 
