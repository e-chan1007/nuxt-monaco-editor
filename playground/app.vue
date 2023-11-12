<template>
  <div class="container">
    <h1>nuxt-monaco-editor</h1>
    <section>
      <h2>
        Code Editor
      </h2>
      <select v-model="lang">
        <option value="plaintext">
          Plain Text
        </option>
        <option value="html">
          HTML
        </option>
        <option value="css">
          CSS
        </option>
        <option value="javascript">
          JavaScript
        </option>
      </select>
      <ClientOnly>
        <MonacoEditor v-model="val" :lang="lang" :options="options" class="editor">
          Loading...
        </MonacoEditor>
      </ClientOnly>
    </section>
    <section>
      <h2>
        Diff Editor
      </h2>
      <MonacoDiffEditor v-model="modifiedVal" :original="originalVal" :options="options" class="editor">
        Loading...
      </MonacoDiffEditor>
    </section>
    <section>
      <h2>Model Values (readonly)</h2>
      <MonacoEditor :model-value="JSON.stringify({ val, modifiedVal }, null, 2)" :options="{ ...options, readOnly: true }" lang="json" class="editor" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type * as monaco from 'monaco-editor'

const lang = ref<'plaintext' | 'html' | 'css' | 'javascript'>('plaintext')
const options: monaco.editor.IEditorConstructionOptions = {
  automaticLayout: true
}

const val = ref('Hello nuxt-monaco-editor!')
const originalVal = 'Hello nuxt-monaco-editor.'
const modifiedVal = ref('Hello nuxt-monaco-editor!!!')

watchEffect(() => {
  switch (lang.value) {
    case 'plaintext':
      val.value = 'Hello nuxt-monaco-editor!'
      break
    case 'html':
      val.value = '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello nuxt-monaco-editor!</h1>\n  </body>\n</html>'
      break
    case 'css':
      val.value = '.hello__nuxt-monaco-editor {\n  border: 1px solid black;\n}'
      break
    case 'javascript':
      val.value = "alert('Hello nuxt-monaco-editor!')"
      break
  }
})
</script>
