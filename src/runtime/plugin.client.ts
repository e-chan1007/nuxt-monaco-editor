import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { _useMonacoState } from './composables'

declare let require: any

export default defineNuxtPlugin(_nuxtApp => new Promise<void>((resolve) => {
  const monacoState = _useMonacoState()
  const locale = useRuntimeConfig().app.__MONACO_EDITOR_LOCALE__

  const script = document.createElement('script')
  script.src = '/_monaco/vs/loader.js'
  script.onload = () => {
    require.config({ paths: { vs: '/_monaco/vs' } })
    if (locale !== 'en') {
      require.config({
        'vs/nls': {
          availableLanguages: {
            '*': locale
          }
        }
      })
    }
    require(['vs/editor/editor.main'], (monaco) => {
      monacoState.value = monaco
      resolve()
    })
  }
  document.head.appendChild(script)
}))
