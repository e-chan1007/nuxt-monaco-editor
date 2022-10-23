<template>
  <div ref="editorElement">
    <slot v-if="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import type * as Monaco from 'monaco-editor'
import { onMounted, ref, watch } from 'vue'
import { useMonaco } from './composables'

interface Props {
  /**
   * Programming Language (Not a locale for UI);
   * overrides `options.language`
  */
  lang?: string;
  /**
   * Options passed to the second argument of `monaco.editor.createDiffEditor`
   */
  options?: Monaco.editor.IStandaloneDiffEditorConstructionOptions
  original?: string;
  modelValue?: string;
}

interface Emits {
  (event: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  lang: () => 'plaintext',
  options: () => ({}),
  original: () => '',
  modelValue: () => ''
})
const emit = defineEmits<Emits>()
const isLoading = ref(true)

const editorElement = ref<HTMLDivElement>()
const monaco = useMonaco()!

let ignoreWatch = false
let editor: Monaco.editor.IStandaloneDiffEditor
let originalModel: Monaco.editor.ITextModel
let modifiedModel: Monaco.editor.ITextModel
const editorRef = ref(editor)

watch(() => [props.original, props.modelValue], () => {
  if (ignoreWatch) {
    ignoreWatch = false
    return
  }
  originalModel.setValue(props.original)
  modifiedModel.setValue(props.modelValue)
})

watch(() => props.lang, () => {
  if (originalModel) { originalModel.dispose() }
  if (modifiedModel) { originalModel.dispose() }
  originalModel = monaco.editor.createModel(props.original, props.lang)
  modifiedModel = monaco.editor.createModel(props.modelValue, props.lang)
  editor.setModel({
    original: originalModel,
    modified: modifiedModel
  })
})

watch(() => props.options, () => {
  editor?.updateOptions(props.options)
})

defineExpose({
  /**
   * Monaco editor instance
   */
  // @ts-ignore
  $editor: editorRef
})

onMounted(() => {
  editor = monaco.editor.createDiffEditor(editorElement.value!, props.options)
  editorRef.value = editor
  originalModel = monaco.editor.createModel(props.original, props.lang)
  modifiedModel = monaco.editor.createModel(props.modelValue, props.lang)
  editor.setModel({
    original: originalModel,
    modified: modifiedModel
  })

  editor.onDidUpdateDiff(() => {
    ignoreWatch = true
    emit('update:modelValue', editor.getModel()!.modified.getValue())
  })

  isLoading.value = false
})
</script>
