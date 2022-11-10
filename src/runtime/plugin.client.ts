import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { _useMonacoState } from './composables'

declare let require: any

export default defineNuxtPlugin(_nuxtApp => new Promise<void>((resolve) => {
  const monacoState = _useMonacoState()
  const { __MONACO_EDITOR_LOCALE__: locale, __MONACO_EDITOR_LOCATION__: monacoLocation } = useRuntimeConfig().app
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

  require(['vs/editor/editor.main'], (monaco: typeof monacoState.value) => {
    monacoState.value = monaco
    resolve()
  })
}))
