import { describe, expect, test } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'
import { collectConsoleErrors, waitForWorkers } from './utils'

describe('CSR', async () => {
  await setup({
    nuxtConfig: {
      ssr: false
    }
  })
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
  test('should preserve a user-provided MonacoEnvironment', { timeout: 60e3 }, async () => {
    const page = await createPage('/')
    await page.addInitScript(() => {
      const w = window as unknown as Record<string, unknown>
      w.__customGetWorker = () => new Worker('data:text/javascript,', { type: 'module' })
      w.MonacoEnvironment = { getWorker: w.__customGetWorker, baseUrl: '/custom-base' }
    })
    await page.reload()
    await page.waitForLoadState('domcontentloaded')
    await page.locator('section > .editor > .monaco-editor').first().waitFor()
    const env = await page.evaluate(() => {
      const w = window as unknown as Record<string, unknown>
      const environment = w.MonacoEnvironment as Record<string, unknown>
      return { preserved: environment.getWorker === w.__customGetWorker, baseUrl: environment.baseUrl }
    })
    expect(env.preserved).toEqual(true)
    expect(env.baseUrl).toEqual('/custom-base')
  })
})
