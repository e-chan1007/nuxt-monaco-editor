// vitest.config.ts
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    testTimeout: 20e3,
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./playground', import.meta.url))
      }
    },
    alias: [{
      find: /^monaco-editor$/,
      replacement: path.join(__dirname, './node_modules/monaco-editor/esm/vs/editor/editor.api')
    }]
  }
})
