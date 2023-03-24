import { defineNuxtPlugin } from '#app'

/* eslint-disable import/default */
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { _useMonacoState } from './composables'

export default defineNuxtPlugin(async (nuxtApp) => {
  self.MonacoEnvironment = {
    getWorker (workerId: string, label: string) {
      switch (label) {
        case 'json':
          return new JSONWorker()
        case 'css':
        case 'scss':
        case 'less':
          return new CSSWorker()
        case 'html':
        case 'handlebars':
        case 'razor':
          return new HTMLWorker()
        case 'typescript':
        case 'javascript':
          return new TSWorker()
        default:
          return new EditorWorker()
      }
    }
  }

  const monacoState = _useMonacoState()
  monacoState.value = await import('monaco-editor')
})
