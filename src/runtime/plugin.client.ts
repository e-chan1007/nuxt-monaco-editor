import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type * as Monaco from 'monaco-editor'
import monacoLoader from 'monaco-editor/min/vs/loader?url'
import { _useMonacoState } from './composables'

declare let require: any

export default defineNuxtPlugin(_nuxtApp => new Promise<void>((resolve) => {
  const monacoState = _useMonacoState()
  const locale = useRuntimeConfig().app.__MONACO_EDITOR_LOCALE__

  const script = document.createElement('script')
  script.src = monacoLoader
  script.onload = () => {
    require.config({ paths: { vs: monacoLoader.replace(/\/loader.js$/, '') } })
    if (locale !== 'en') {
      require.config({
        'vs/nls': {
          availableLanguages: {
            '*': locale
          }
        }
      })
    }
    require(['vs/editor/editor.main'], (monaco: typeof Monaco) => {
      monacoState.value = monaco
      resolve()
    })
  }
  document.head.appendChild(script)
}))
