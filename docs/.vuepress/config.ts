import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  base: (process.env.BASE_URL as `/${string}/` | undefined) || '/',
  title: 'nuxt-monaco-editor',
  description: 'The easist way to get along with Monaco Editor.',
  theme: defaultTheme({
    repo: 'e-chan1007/nuxt-monaco-editor',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
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
    ]
  })
})
