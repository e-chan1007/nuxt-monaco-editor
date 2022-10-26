<script setup>
import Stackbiltz from '../../../components/Stackbiltz.vue'
</script>

# &lt;MonacoDiffEditor&gt;
To show differences between two files, you can use `<MonacoDiffEditor>` component.

Usage of `<MonacoDiffEditor>` is almost the same as [`<MonacoEditor>`](monaco-editor).

<Stackbiltz src="nuxt-starter-vf6nfx?embed=1&file=app.vue&hideNavigation=1&view=preview" />

## Get & Set values
```vue
<template>
  <MonacoDiffEditor :original="originalValue" v-model="modifiedValue" />
</template>

<script lang="ts" setup>
const originalValue = ref('Original Value')
const modifiedValue = ref('Modified Value')
</script>
```
`v-model` is for the **modified value**. Original value is read-only in monaco-editor.

## Fallback Content
```vue
<template>
  <MonacoDiffEditor>
    Loading...
  </MonacoDiffEditor>
</template>
```
Children of `<MonacoDiffEditor>` will be shown until the editor is loaded.

## Props
### `lang`
- Default: `plaintext`

A programming language for colorization, which will override the editor's option `options.language`.

Available languages are listed [here](https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages).

### `options`
- Default: `{}`

Options passed  to the second argument of `monaco.editor.createDiffEditor`.
You can also change the options after the editor mounted.

Available options are listed [here](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneDiffEditorConstructionOptions.html).

## Events
```ts
interface Emits {
  (event: 'update:modelValue', value: string): void
  (event: 'load', editor: monaco.editor.IStandaloneDiffEditor): void
}
```
### `load`
Emitted with an instance of [`IStandaloneDiffEditor`](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneDiffEditor.html) when the editor is loaded

## `Ref` of `<MonacoDiffEditor>`
You can access to the editor instanc by using `ref` and `$editor`.
```vue
<template>
  <MonacoDiffEditor ref="editorRef" />
</template>

<script lang="ts" setup>
import { MonacoEditor } from '#build/components'
const editorRef = ref<InstanceType<typeof MonacoDiffEditor>>()

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
