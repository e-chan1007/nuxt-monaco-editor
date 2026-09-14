import type { Page, Response } from 'playwright-core'

export function collectConsoleErrors (page: Page): string[] {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => {
    errors.push(err.message)
  })
  return errors
}

export async function waitForWorkers (page: Page): Promise<void> {
  const pending = new Set<Promise<unknown>>()
  const onResponse = (res: Response) => {
    if (res.url().includes('.worker')) pending.add(res.finished().catch(() => {}))
  }
  page.on('response', onResponse)

  const select = page.locator('section').first().locator('select')
  if (await select.count() > 0) {
    for (const lang of ['html', 'css', 'javascript']) {
      await select.selectOption(lang)
    }
  }

  await page.waitForLoadState('networkidle')
  await Promise.all(pending)
  page.off('response', onResponse)
}
