import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addComponent, createResolver, addImports } from '@nuxt/kit'
import type { MonacoEditorLocale } from './runtime/locales'

export type { MonacoEditorLocale }

export interface ModuleOptions {
  locale?: MonacoEditorLocale,
  componentName?: {
    codeEditor?: string,
    diffEditor?: string
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    monacoEditor: { locale: MonacoEditorLocale }
  }
}

const getDefaults = (): Required<ModuleOptions> => {
  return {
    locale: 'en',
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor'
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-monaco-editor',
    configKey: 'monacoEditor',
    compatibility: { nuxt: '>=3.1.0 || ^4' }
  },
  defaults: getDefaults,
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    const { resolve } = createResolver(runtimeDir)

    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.build.transpile.push(({ isClient }) => isClient ? 'monaco-editor' : false);

    nuxt.options.runtimeConfig.public.monacoEditor = { locale: options.locale! }

    addComponent({ name: options.componentName!.codeEditor!, filePath: resolve('MonacoEditor.client.vue') })
    addComponent({ name: options.componentName!.diffEditor!, filePath: resolve('MonacoDiffEditor.client.vue') })
    addImports({ name: 'useMonaco', as: 'useMonaco', from: resolve('composables') })
  }
})
