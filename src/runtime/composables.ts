import type * as Monaco from 'monaco-editor'
import { useState } from '#imports'

export const _useMonacoState = () => useState<typeof Monaco | null>('MonacoEditorNamespace', () => null)
/**
 * Get `monaco` namespace
 * @returns `monaco` namespace: if unavailable (server-side), returns `null`
 */
export const useMonaco = (): typeof Monaco | null => _useMonacoState().value
