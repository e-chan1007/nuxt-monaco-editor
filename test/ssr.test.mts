import { describe, expect, test } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils'
import { collectConsoleErrors, waitForWorkers } from './utils'

describe('SSR', async () => {
  await setup()
  test('should render <MonacoEditor> components', async () => {
    const page = await createPage('/')
    const errors = collectConsoleErrors(page)
    await page.waitForLoadState('domcontentloaded')
    await page.locator('section > .editor > .monaco-editor').first().waitFor()
    expect(await page.locator('section > .editor > .monaco-editor').count()).toEqual(2)
    await waitForWorkers(page)
    expect(errors).toEqual([])
  })
  test('should render <MonacoDiffEditor> component', async () => {
    const page = await createPage('/')
    const errors = collectConsoleErrors(page)
    await page.waitForLoadState('domcontentloaded')
    await page.locator('section > .editor > .monaco-diff-editor').first().waitFor()
    expect(await page.locator('section > .editor > .monaco-diff-editor').count()).toEqual(1)
    await waitForWorkers(page)
    expect(errors).toEqual([])
  })
})
