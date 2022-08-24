# useMonaco
`monaco` 名前空間を取得します。`import * as monaco from 'monaco-editor'`と同等の処理を行えます。

このコンポーサブルはどこでも利用が可能ですが、返り値が異なります。
- クライアント: `monaco` 名前空間 (読み込み後)
- サーバー: 常に `null`

なお、monaco-editor の型やインターフェースを利用する場合は以下のように記述してください。
```ts
import type { ISelection } from 'monaco-editor'
```

## 例
```ts
const monaco = useMonaco()!
const editorEl = ref<HTMLDivElement>()
monaco.editor.create(editorEl.value, { language: 'typescript' })
```
