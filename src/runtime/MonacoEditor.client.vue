<template>
  <div ref="editorElement">
    <slot v-if="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { Uri } from 'monaco-editor/esm/vs/base/common/uri'
import { ITextModel } from 'monaco-editor/esm/vs/editor/common/model';
import { IStandaloneEditorConstructionOptions } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneEditor'
import { computed, ref, shallowRef, watch, onBeforeUnmount } from 'vue'
import { defu } from 'defu'
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
    options?: IStandaloneEditorConstructionOptions;
    /**
     * The URI that identifies models
     */
    // eslint-disable-next-line vue/require-default-prop
    modelUri?: Uri;

    modelValue?: string;
}

interface Emits {
    (event: 'update:modelValue', value: string): void
    (event: 'load', editor: IStandaloneCodeEditor): void
}

const props = withDefaults(defineProps<Props>(), {
  lang: () => 'plaintext',
  options: () => ({}),
  modelValue: () => ''
})

const emit = defineEmits<Emits>()
const isLoading = ref(true)
const lang = computed(() => props.lang || props.options.language)
const editorRef = shallowRef<IStandaloneCodeEditor>()
const editorElement = ref<HTMLDivElement>()
const monaco = useMonaco()!
const defaultOptions: IStandaloneEditorConstructionOptions = {
  automaticLayout: true
}

let editor: IStandaloneCodeEditor
let model: ITextModel

watch(() => props.modelValue, () => {
  if (editor?.getValue() !== props.modelValue) {
    editor?.setValue(props.modelValue)
  }
})

watch(() => [props.lang, props.modelUri], () => {
  if (model) {
    model.dispose()
  }
  model = monaco.editor.createModel(props.modelValue, lang.value, props.modelUri)
  editor?.setModel(model)
})

watch(() => props.options, () => {
  editor?.updateOptions(defu(props.options, defaultOptions))
})

watch(editorElement, (newValue, oldValue) => {
  if (!editorElement.value || oldValue) { return }
  editor = monaco.editor.create(editorElement.value!, defu(props.options, defaultOptions))
  model = monaco.editor.createModel(props.modelValue, lang.value, props.modelUri)
  editorRef.value = editor
  editor.layout()
  editor.setModel(model)
  editor.onDidChangeModelContent(() => {
    emit('update:modelValue', editor.getValue())
  })
  isLoading.value = false
  emit('load', editor)
})

defineExpose({
  /**
     * Monaco editor instance
     */
  $editor: editorRef
})

onBeforeUnmount(() => {
  editor?.dispose()
  model?.dispose()
})
</script>
