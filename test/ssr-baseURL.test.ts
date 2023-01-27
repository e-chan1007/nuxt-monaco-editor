import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, $fetch, createPage } from '@nuxt/test-utils'

describe('SSR (baseURL: "/test")', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    nuxtConfig: {
      app: {
        baseURL: '/test'
      }
    }
  })
  test('should render page', async () => {
    const html = await $fetch('/test')
    expect(html).toContain('<h1>nuxt-monaco-editor</h1>')
  })
  test('should render <MonacoEditor> components', async () => {
    const page = await createPage('/test')
    await page.waitForLoadState('domcontentloaded')
    const editorElements = await page.$$('section > .editor > .monaco-editor')
    expect(editorElements.length).toEqual(2)
  })
  test('should render <MonacoDiffEditor> component', async () => {
    const page = await createPage('/test')
    await page.waitForLoadState('domcontentloaded')
    const editorElements = await page.$$('section > .editor > .monaco-diff-editor')
    expect(editorElements.length).toEqual(1)
  })
})
