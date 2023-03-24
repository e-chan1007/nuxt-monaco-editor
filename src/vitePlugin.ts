import { fileURLToPath } from 'node:url'
import fs from 'fs/promises'
import { createResolver } from '@nuxt/kit'
import { Plugin } from 'vite'
import { ModuleOptions } from './module'

const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
const { resolve } = createResolver(runtimeDir)
const rewrittenMonacoFiles = new Map<string, string>()
const nlsPath = resolve('nls.mjs')

const plugin = (options: ModuleOptions): Plugin => ({
  name: 'vite-plugin-nuxt-monaco-editor',
  enforce: 'pre',
  resolveId (src) {
    if (src.includes('monaco-editor/esm')) { fs.appendFile('log.log', src + '\n') }
    if (src.startsWith('/__skip_vite/node_modules/monaco-editor/esm/vs/') && src.endsWith('.js?worker')) {
      return src.replace('/__skip_vite/', '')
    }
  },
  async load (id) {
    if (options.locale !== 'en') {
      id = id.split('?')[0]
      if (rewrittenMonacoFiles.has(id)) {
        return { code: rewrittenMonacoFiles.get(id)! }
      }
      if (/\/(vscode-)?nls\.m?js/.test(id)) {
        const code = (await fs.readFile(resolve('nls.mjs'), 'utf-8'))
          .replace('__LOCALE_DATA_PATH__', `monaco-editor-nls/locale/${options.locale}.json`)
        rewrittenMonacoFiles.set(id, code)
        return { code }
      }
      if (/monaco-editor\/esm\/vs.+\.js/.test(id)) {
        const vsPath = id.split(/monaco-editor\/esm\//).pop()
        if (vsPath) {
          const path = vsPath.replace('.js', '')
          const code = (await fs.readFile(id, 'utf-8'))
            .replace(/import \* as nls from '.+nls\.js(\?v=.+)?';/g, `import * as nls from '${nlsPath}';`)
            .replace(/(?<!function )localize\(/g, `localize('${path}', `)
          rewrittenMonacoFiles.set(id, code)
          return { code }
        }
      }
    }
  }
})

export default plugin
