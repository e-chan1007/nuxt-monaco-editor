import { defu } from 'defu'
import { useRuntimeConfig } from '#imports'
import EditorWorker from 'monaco-editor/editor/editor.worker.js?worker'
import HtmlWorker from 'monaco-editor/languages/features/html/html.worker.js?worker'
import CssWorker from 'monaco-editor/languages/features/css/css.worker.js?worker'
import JsonWorker from 'monaco-editor/languages/features/json/json.worker.js?worker'
import TsWorker from 'monaco-editor/languages/features/typescript/ts.worker.js?worker'
import { nls } from './locales'
import type { MonacoEditorLocale } from './locales'
import type * as Monaco from 'monaco-editor'

let monacoPromise: Promise<typeof Monaco> | null = null

async function loadMonaco (): Promise<typeof Monaco> {
  const { locale } = useRuntimeConfig().public.monacoEditor as { locale: MonacoEditorLocale }
  if (locale !== 'en') await nls[locale]()

  const getWorker = (_id: string, label: string): Worker => {
    switch (label) {
      case 'json':
        return new JsonWorker()
      case 'css':
      case 'scss':
      case 'less':
        return new CssWorker()
      case 'html':
      case 'handlebars':
      case 'razor':
        return new HtmlWorker()
      case 'typescript':
      case 'javascript':
        return new TsWorker()
      default:
        return new EditorWorker()
    }
  }

  self.MonacoEnvironment = defu(self.MonacoEnvironment, { getWorker })

  return await import('monaco-editor')
}

export function useMonaco () {
  if (import.meta.server) {
    return Promise.reject(new Error('monaco-editor cannot be loaded on server'))
  }
  if (!monacoPromise) {
    monacoPromise = loadMonaco()
  }
  return monacoPromise
}
