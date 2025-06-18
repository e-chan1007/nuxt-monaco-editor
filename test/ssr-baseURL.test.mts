import { describe, expect, test } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils'

describe('SSR (baseURL: "/test/")', async () => {
  await setup({
    nuxtConfig: {
      app: {
        baseURL: '/test/'
      }
    }
  })
  test('should render <MonacoEditor> components', async () => {
    const page = await createPage('/test')
    await page.waitForLoadState('domcontentloaded')
    await page.locator('section > .editor > .monaco-editor').first().waitFor()
    expect(await page.locator('section > .editor > .monaco-editor').count()).toEqual(2)
  })
  test('should render <MonacoDiffEditor> component', async () => {
    const page = await createPage('/test')
    await page.waitForLoadState('domcontentloaded')
    await page.locator('section > .editor > .monaco-diff-editor').first().waitFor()
    expect(await page.locator('section > .editor > .monaco-diff-editor').count()).toEqual(1)
  })
})
