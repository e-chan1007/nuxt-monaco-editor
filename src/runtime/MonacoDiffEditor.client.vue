<template>
  <div ref="editorElement">
    <slot v-if="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import type * as Monaco from 'monaco-editor'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { defu } from 'defu'
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
  options?: Monaco.editor.IStandaloneDiffEditorConstructionOptions;
  /**
   * The URI that identifies models
   */
  // eslint-disable-next-line vue/require-default-prop
  originalModelUri?: Monaco.Uri;

  /**
   * The URI that identifies models
   */
  // eslint-disable-next-line vue/require-default-prop
  modelUri?: Monaco.Uri;

  original?: string;
  modelValue?: string;
}

interface Emits {
  (event: 'update:modelValue', value: string): void
  (event: 'load', editor: Monaco.editor.IStandaloneDiffEditor): void
}

const props = withDefaults(defineProps<Props>(), {
  lang: () => 'plaintext',
  options: () => ({}),
  original: () => '',
  modelValue: () => ''
})
const emit = defineEmits<Emits>()
const isLoading = ref(true)

const editorElement = shallowRef<HTMLDivElement>()
const monaco = useMonaco()!

let editor: Monaco.editor.IStandaloneDiffEditor
let originalModel: Monaco.editor.ITextModel
let modifiedModel: Monaco.editor.ITextModel

const editorRef = shallowRef<Monaco.editor.IStandaloneDiffEditor>()
const defaultOptions: Monaco.editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true
}

watch(() => [props.original, props.modelValue], () => {
  if (originalModel.getValue() !== props.original || modifiedModel.getValue() !== props.modelValue) {
    originalModel.setValue(props.original)
    modifiedModel.setValue(props.modelValue)
  }
})

watch(() => props.lang, () => {
  const originalValue = originalModel?.getValue() || props.original
  const modifiedValue = modifiedModel?.getValue() || props.modelValue
  if (originalModel) { originalModel.dispose() }
  if (modifiedModel) { modifiedModel.dispose() }
  originalModel = monaco.editor.createModel(originalValue, props.lang, props.originalModelUri)
  modifiedModel = monaco.editor.createModel(modifiedValue, props.lang, props.modelUri)
  editor.setModel({
    original: originalModel,
    modified: modifiedModel
  })
})

watch(() => props.options, () => {
  editor?.updateOptions(defu(props.options, defaultOptions))
})

defineExpose({
  /**
   * Monaco editor instance
   */
  $editor: editorRef
})

watch(editorElement, (newValue, oldValue) => {
  if (!editorElement.value || oldValue) { return }
  editor = monaco.editor.createDiffEditor(editorElement.value!, defu(props.options, defaultOptions))
  editorRef.value = editor
  originalModel = monaco.editor.createModel(props.original, props.lang, props.originalModelUri)
  modifiedModel = monaco.editor.createModel(props.modelValue, props.lang, props.modelUri)
  editor.setModel({
    original: originalModel,
    modified: modifiedModel
  })

  editor.onDidUpdateDiff(() => {
    emit('update:modelValue', editor.getModel()!.modified.getValue())
  })

  isLoading.value = false
  emit('load', editor)
})

onBeforeUnmount(() => {
  editor?.dispose()
  originalModel?.dispose()
  modifiedModel?.dispose()
})
</script>
