import { join } from 'node:path'
import { existsSync } from 'node:fs'

export function getMonacoEditorRoot (modulesDirs: string[]): string {
  for (const dir of modulesDirs) {
    const candidate = join(dir, 'monaco-editor')
    if (existsSync(candidate)) return candidate
  }
  throw new Error(`Could not locate monaco-editor in: ${modulesDirs.join(', ')}`)
}
