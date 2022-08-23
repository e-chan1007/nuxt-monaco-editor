import { fileURLToPath } from 'url'
import { defineNuxtModule, addComponent, addAutoImport, addPlugin, createResolver, addPluginTemplate } from '@nuxt/kit'

export type MonacoEditorLocale = 'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-cn' | 'zh-tw' | 'en';

export interface ModuleOptions {
  locale?: MonacoEditorLocale,
  componentName?: {
    codeEditor?: string,
    diffEditor?: string
  }
}

const DEFAULTS: ModuleOptions = {
  locale: 'en',
  componentName: {
    codeEditor: 'MonacoEditor',
    diffEditor: 'MonacoDiffEditor'
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-monaco-editor',
    configKey: 'monacoEditor',
    compatibility: { nuxt: '^3.0.0' }
  },
  defaults: DEFAULTS,
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    const { resolve } = createResolver(runtimeDir)
    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.build.transpile.push('monaco-editor')
    nuxt.options.runtimeConfig.app.__MONACO_EDITOR_LOCALE__ = options.locale

    addPlugin(resolve('plugin.client.ts'))
    addComponent({ name: options.componentName.codeEditor, filePath: resolve('MonacoEditor.vue') })
    addComponent({ name: options.componentName.diffEditor, filePath: resolve('MonacoDiffEditor.vue') })
    addAutoImport({ name: 'useMonaco', as: 'useMonaco', from: resolve('composables') })
  }
})
