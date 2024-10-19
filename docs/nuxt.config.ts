// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  modules: ['nuxt-content-twoslash', '../src/module'],
  compatibilityDate: '2024-07-06',
  site: {
    url: 'https://e-chan1007.github.io/',
    name: 'Nuxt Monaco Editor',
    description: 'The easiest way to get along with Monaco Editor.'
  },
  nitro: {
    prerender: {
      failOnError: false
    }
  },
  twoslash: {}
})
