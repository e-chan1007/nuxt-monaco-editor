import { copyFile, mkdir, readdir, rm } from 'fs/promises'

(async () => {
  await rm('dist/i18n', { force: true, recursive: true })
  await mkdir('dist/i18n', { recursive: true })

  const languagePacks = await readdir('vscode-loc/i18n')

  await Promise.all(languagePacks.map(languagePack =>
    copyFile(
    `vscode-loc/i18n/${languagePack}/translations/main.i18n.json`,
    `dist/i18n/${languagePack.replace('vscode-language-pack-', '')}.json`
    )
  ))
})()
