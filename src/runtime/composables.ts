import type * as Monaco from 'monaco-editor'

export const _useMonacoState = () => useState<typeof Monaco>('MonacoEditorNamespace', () => null)
/**
 * Get `monaco` namespace
 * @returns `Promise` that returns `monaco` namespace: if unavailable (server-side), returns `null`
 */
export const useMonaco = () => _useMonacoState().value
