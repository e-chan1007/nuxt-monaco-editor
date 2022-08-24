import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  base: (process.env.BASE_URL as `/${string}/` | undefined) || '/',
  title: 'nuxt-monaco-editor',
  description: 'The easist way to get along with Monaco Editor.',
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/ja/': {
      lang: 'ja-JP'
    }
  },
  theme: defaultTheme({
    repo: 'e-chan1007/nuxt-monaco-editor',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    locales: {
      '/': {
        selectLanguageName: 'English',
        sidebar: [
          {
            text: 'Guide',
            children: [
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'Configuration', link: '/guide/configuration' },
              { text: 'Customize UI', link: '/guide/customize-ui' },
            ]
          },
          {
            text: 'References',
            children: [
              { text: '<MonacoEditor>', link: '/references/monaco-editor' },
              { text: '<MonacoDiffEditor>', link: '/references/monaco-diff-editor' },
              { text: 'useMonaco', link: '/references/use-monaco' },
            ]
          }
        ],
      },
      '/ja/': {
        selectLanguageName: '日本語',
        editLinkText: 'このページを編集する',
        sidebar: [
          {
            text: 'ガイド',
            children: [
              { text: 'はじめる', link: '/ja/guide/getting-started' },
              { text: '設定', link: '/ja/guide/configuration' },
              { text: 'UIのカスタマイズ', link: '/ja/guide/customize-ui' },
            ]
          },
          {
            text: 'リファレンス',
            children: [
              { text: '<MonacoEditor>', link: '/ja/references/monaco-editor' },
              { text: '<MonacoDiffEditor>', link: '/ja/references/monaco-diff-editor' },
              { text: 'useMonaco', link: '/ja/references/use-monaco' },
            ]
          }
        ],
      }
    },
  })
})
