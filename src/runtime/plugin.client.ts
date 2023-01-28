import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { _useMonacoState } from './composables'

declare let require: any

export default defineNuxtPlugin(_nuxtApp => new Promise<void>((resolve) => {
  const monacoState = _useMonacoState()
  const { __MONACO_EDITOR_LOCALE__: locale, __MONACO_EDITOR_LOCATION__: monacoEditorLocation } = useRuntimeConfig().app
  const loaderScript = document.createElement('script')
  loaderScript.src = `${monacoEditorLocation}/vs/loader.js`
  loaderScript.addEventListener('load', () => {
    require.config({ paths: { vs: `${monacoEditorLocation}/vs` } })
    if (locale !== 'en') {
      require.config({
        'vs/nls': {
          availableLanguages: {
            '*': locale
          }
        }
      })
    }

    require(['vs/editor/editor.main'], (monaco: typeof monacoState.value) => {
      monacoState.value = monaco
      resolve()
    })
  })
  document.body.appendChild(loaderScript)
}))
