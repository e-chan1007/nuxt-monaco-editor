import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, $fetch, createPage } from '@nuxt/test-utils-edge'

describe('SSR (dev: true)', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    dev: true
  })
  test('should render page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>nuxt-monaco-editor</h1>')
  })
  test('should render <MonacoEditor> components', async () => {
    const page = await createPage('/')
    await page.waitForLoadState('domcontentloaded')
    const editorElements = await page.$$('section > .editor > .monaco-editor')
    expect(editorElements.length).toEqual(2)
  })
  test('should render <MonacoDiffEditor> component', async () => {
    const page = await createPage('/')
    await page.waitForLoadState('domcontentloaded')
    const editorElements = await page.$$('section > .editor > .monaco-diff-editor')
    expect(editorElements.length).toEqual(1)
  })
})
