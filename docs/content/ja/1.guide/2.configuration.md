# 設定
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

UIの言語を設定します。

使用可能な言語はmonaco-editorで使用可能な言語と同じ、 `de`, `en`, `es` , `fr`, `it`, `ja`, `ko`, `ru`, `zh-cn`, `zh-tw` です。

## `componentName`

コンポーネント名を変更します。

`codeEditor` は [`<MonacoEditor>`](../references/monaco-editor)に、 `diffEditor` は [`<MonacoDiffEditor>`](../references/monaco-diff-editor) に対応しています。
