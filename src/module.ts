import { fileURLToPath } from 'url'
import { defineNuxtModule, addComponent, addAutoImport, addPlugin, createResolver, addVitePlugin } from '@nuxt/kit'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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

    const [viteStaticCopyServePlugin, viteStaticCopyBuildPlugin] = viteStaticCopy({
      targets: [{
        src: '../node_modules/monaco-editor/min/*',
        dest: '_monaco'
      }]
    })
    addVitePlugin(viteStaticCopyServePlugin)
    addVitePlugin(viteStaticCopyBuildPlugin)

    addPlugin(resolve('plugin.client'))
    addComponent({ name: options.componentName.codeEditor, filePath: resolve('MonacoEditor.vue') })
    addComponent({ name: options.componentName.diffEditor, filePath: resolve('MonacoDiffEditor.vue') })
    addAutoImport({ name: 'useMonaco', as: 'useMonaco', from: resolve('composables') })
  }
})
