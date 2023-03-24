import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, $fetch, createPage } from '@nuxt/test-utils'

describe('SSR', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url))
  })
  test('should render page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>nuxt-monaco-editor</h1>')
  })
  test('should render <MonacoEditor> components', async () => {
    const page = await createPage('/')
    await page.waitForLoadState('domcontentloaded')
    await page.locator('section > .editor > .monaco-editor').first().waitFor()
    expect(await page.locator('section > .editor > .monaco-editor').count()).toEqual(2)
  })
  test('should render <MonacoDiffEditor> component', async () => {
    const page = await createPage('/')
    await page.waitForLoadState('domcontentloaded')
    await page.locator('section > .editor > .monaco-diff-editor').first().waitFor()
    expect(await page.locator('section > .editor > .monaco-diff-editor').count()).toEqual(1)
  })
}, {
  timeout: 10000
})
