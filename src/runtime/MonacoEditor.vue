<template>
  <div ref="editorElement">
    <slot v-if="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
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
   * Options passed to the second argument of `monaco.editor.create`
   */
  options?: Monaco.editor.IStandaloneEditorConstructionOptions
  modelValue?: string;
}

interface Emits {
  (event: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  lang: () => 'plaintext',
  options: () => ({}),
  modelValue: () => ''
})
const emit = defineEmits<Emits>()
const isLoading = ref(true)

const lang = computed(() => props.lang || props.options.language)

const editorElement = ref<HTMLDivElement>()
const monaco = useMonaco()

let ignoreWatch = false
let editor: Monaco.editor.IStandaloneCodeEditor
let model: Monaco.editor.ITextModel

watch(() => props.modelValue, () => {
  if (ignoreWatch) {
    ignoreWatch = false
    return
  }
  editor?.setValue(props.modelValue)
})

watch(() => props.lang, () => {
  if (model) { model.dispose() }
  model = monaco.editor.createModel(props.modelValue, lang.value)
  editor?.setModel(model)
})

watch(() => props.options, () => {
  editor?.updateOptions(props.options)
})

defineExpose({
  /**
   * Monaco editor instance
   */
  // @ts-ignore
  $editor: editor
})

onMounted(() => {
  editor = monaco.editor.create(editorElement.value, props.options)
  model = monaco.editor.createModel(props.modelValue, lang.value)
  editor.setModel(model)

  editor.onDidChangeModelContent(() => {
    ignoreWatch = true
    emit('update:modelValue', editor.getValue())
  })

  isLoading.value = false
})
</script>
