import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

const require = createRequire(import.meta.url)

/**
 * Locate the monaco-editor package root on disk.
 * Deep paths like `monaco-editor/esm/...` break under 0.56+ package exports
 * (which remap `./*` → `./esm/vs/*`), so resolve via the package entry instead.
 */
export function getMonacoEditorRoot (): string {
  const entry = require.resolve('monaco-editor')
  let dir = dirname(entry)

  for (let i = 0; i < 10; i++) {
    const pkgPath = join(dir, 'package.json')
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { name?: string }
        if (pkg.name === 'monaco-editor') {
          return dir
        }
      } catch {
        // continue walking
      }
    }
    const parent = dirname(dir)
    if (parent === dir) {
      break
    }
    dir = parent
  }

  throw new Error(`Could not locate monaco-editor package root from ${entry}`)
}

export function resolveMonacoPath (...segments: string[]): string {
  return join(getMonacoEditorRoot(), ...segments)
}
