import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { _useMonacoState } from './composables'

declare let require: any

export default defineNuxtPlugin(_nuxtApp => new Promise<void>((resolve) => {
  const monacoState = _useMonacoState()
  const { __MONACO_EDITOR_LOCALE__: locale, __MONACO_EDITOR_LOCATION__: monacoLocation } = useRuntimeConfig().app
  const script = document.createElement('script')
  script.src = `${monacoLocation}/vs/loader.js`
  script.onload = () => {
    require.config({ paths: { vs: `${monacoLocation}/vs` } })
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
