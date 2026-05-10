import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 20e3,
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./playground', import.meta.url))
      }
    },
    projects: [
      {
        test: {
          name: 'e2e',
          include: ['test/*.test.mts'],
          environment: 'node',
        },
      }
    ]
  },
  resolve: {
    alias: {
      "monaco-editor":path.join(__dirname, './node_modules/monaco-editor/esm/vs/editor/editor.api')
    }
  },
})
