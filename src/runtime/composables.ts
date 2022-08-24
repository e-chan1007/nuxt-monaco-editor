import { useState } from '#app'
import type * as Monaco from 'monaco-editor'

export const _useMonacoState = () => useState<typeof Monaco>('MonacoEditorNamespace', () => null)
/**
 * Get `monaco` namespace
 * @returns `monaco` namespace: if unavailable (server-side), returns `null`
 */
export const useMonaco = (): typeof Monaco | null => _useMonacoState().value
