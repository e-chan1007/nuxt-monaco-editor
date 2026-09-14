export const nls = {
  cs: () => import('monaco-editor/nls/lang/cs.js'),
  de: () => import('monaco-editor/nls/lang/de.js'),
  es: () => import('monaco-editor/nls/lang/es.js'),
  fr: () => import('monaco-editor/nls/lang/fr.js'),
  it: () => import('monaco-editor/nls/lang/it.js'),
  ja: () => import('monaco-editor/nls/lang/ja.js'),
  ko: () => import('monaco-editor/nls/lang/ko.js'),
  pl: () => import('monaco-editor/nls/lang/pl.js'),
  'pt-br': () => import('monaco-editor/nls/lang/pt-br.js'),
  ru: () => import('monaco-editor/nls/lang/ru.js'),
  tr: () => import('monaco-editor/nls/lang/tr.js'),
  'zh-hans': () => import('monaco-editor/nls/lang/zh-cn.js'),
  'zh-hant': () => import('monaco-editor/nls/lang/zh-tw.js')
} as const

export type MonacoEditorLocale = keyof typeof nls | 'en'
