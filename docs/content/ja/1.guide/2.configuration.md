# 設定
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

ビルド後のmonaco-editorの配置先を設定します。Nuxtの設定の`app.baseURL`に追加して配置されます。

## `locale`

UIの言語を設定します。

使用可能な言語はmonaco-editorで使用可能な言語と同じ、 `de`, `en`, `es` , `fr`, `it`, `ja`, `ko`, `ru`, `zh-cn`, `zh-tw` です。

## `componentName`

コンポーネント名を変更します。

`codeEditor` は [`<MonacoEditor>`](../references/monaco-editor)に、 `diffEditor` は [`<MonacoDiffEditor>`](../references/monaco-diff-editor) に対応しています。
