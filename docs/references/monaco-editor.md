<script setup>
import Stackbiltz from '../../../components/Stackbiltz.vue'
</script>

# &lt;MonacoEditor&gt;
As if it were an `<input>` or `<textarea>`, you can easily use `<MonacoEditor>` component to show the editor.

<Stackbiltz src="nuxt-starter-dnwsbl?embed=1&file=app.vue&hideNavigation=1&view=preview" />

## Get & Set value
```vue
<template>
  <MonacoEditor v-model="value" />
</template>

<script lang="ts" setup>
const value = ref('')
</script>
```

## Fallback Content
```vue
<template>
  <MonacoEditor>
    Loading...
  </MonacoEditor>
</template>
```
Children of `<MonacoEditor>` will be shown until the editor is loaded.

## Props
### `lang`
- Default: `plaintext`

A programming language for colorization, which will override the editor's option `options.language`.

Available languages are listed [here](https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages).

### `options`
- Default: `{}`

Options passed  to the second argument of `monaco.editor.create`.
You can also change the options after the editor mounted.

Available options are listed [here](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html).

## Events
```ts
interface Emits {
  (event: 'update:modelValue', value: string): void
  (event: 'load', editor: monaco.editor.IStandaloneCodeEditor): void
}
```
### `load`
Emitted with an instance of [`IStandaloneCodeEditor`](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneCodeEditor.html) when the editor is loaded

## `Ref` of `<MonacoEditor>`
You can access to the editor instanc by using `ref` and `$editor`.
```vue
<template>
  <MonacoEditor ref="editorRef" />
</template>

<script lang="ts" setup>
import { MonacoEditor } from '#build/components'
const editorRef = ref<InstanceType<typeof MonacoEditor>>()

// For example, add greeting action to editor...
editorRef.value?.$editor.addAction({
  id: 'hello-world',
  label: 'Hello world',
  run: function (ed) {
    alert('Hello world!')
  }
})
</script>
```
