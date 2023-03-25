import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addComponent, addPlugin, createResolver, addImports, addVitePlugin } from '@nuxt/kit'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vitePlugin from './vitePlugin'

export type MonacoEditorLocale = 'cs' | 'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'pl' | 'pt-br' | 'qps-ploc' | 'ru' | 'tr' | 'zh-hans' | 'zh-hant' | 'en';

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
    compatibility: { nuxt: '^3.1.0' }
  },
  defaults: DEFAULTS,
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    const { resolve } = createResolver(runtimeDir)

    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.build.transpile.push(({ isClient }) => isClient ? 'monaco-editor' : false)

    addVitePlugin(vitePlugin(options, nuxt.options))

    addVitePlugin(viteStaticCopy({
      targets: [{
        src: require
          .resolve('monaco-editor/esm/metadata.js')
          .replace(/\\/g, '/')
          .replace(/\/metadata.js$/, '/*'),
        dest: '_nuxt/nuxt-monaco-editor'
      }]
    }))

    addPlugin(resolve('plugin.client'))

    addComponent({ name: options.componentName!.codeEditor!, filePath: resolve('MonacoEditor.client.vue') })
    addComponent({ name: options.componentName!.diffEditor!, filePath: resolve('MonacoDiffEditor.client.vue') })
    addImports({ name: 'useMonaco', as: 'useMonaco', from: resolve('composables') })
  }
})
