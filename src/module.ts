import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addComponent, createResolver, addImports, addVitePlugin, extendViteConfig } from '@nuxt/kit'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import type { Nuxt } from 'nuxt/schema'
import vitePlugin from './vitePlugin'
import { createRequire } from 'node:module'

export type MonacoEditorLocale = 'cs' | 'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'pl' | 'pt-br' | 'qps-ploc' | 'ru' | 'tr' | 'zh-hans' | 'zh-hant' | 'en';

export interface ModuleOptions {
  locale?: MonacoEditorLocale,
  removeSourceMaps?: boolean,
  componentName?: {
    codeEditor?: string,
    diffEditor?: string
  }
}

const getDefaults = (nuxt: Nuxt): Required<ModuleOptions> => {
  return {
    locale: 'en',
    removeSourceMaps: !nuxt.options.dev,
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor'
    }
  }
}

const require = createRequire(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-monaco-editor',
    configKey: 'monacoEditor',
    compatibility: { nuxt: '>=3.1.0 ^4' }
  },
  defaults: getDefaults,
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    const { resolve } = createResolver(runtimeDir)

    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.build.transpile.push(({ isClient }) => isClient ? 'monaco-editor' : false);

    addVitePlugin(vitePlugin(options as Required<ModuleOptions>, nuxt.options))

    addVitePlugin(viteStaticCopy({
      targets: [{
        src: require
          .resolve('monaco-editor/esm/metadata.js')
          .replace(/\\/g, '/')
          .replace(/\/metadata.js$/, '/*'),
        dest: '_nuxt/nuxt-monaco-editor'
      }]
    }))

    nuxt.hook('build:manifest', (manifest) => {
      Object.entries(manifest).forEach(([key, entry]) => {
        if (key.includes('node_modules/monaco-editor/esm/vs')) { entry.isEntry = false }
      })
    })

    addComponent({ name: options.componentName!.codeEditor!, filePath: resolve('MonacoEditor.client.vue') })
    addComponent({ name: options.componentName!.diffEditor!, filePath: resolve('MonacoDiffEditor.client.vue') })
    addImports({ name: 'useMonaco', as: 'useMonaco', from: resolve('composables') })
  }
})
