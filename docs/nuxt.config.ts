export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  app: {
    head: {
      meta: [{
        name: 'google-site-verification', content: 'rzH-lFve_O6XXzhNiijEf4BZjsqeP_fGozFLwK1T-lQ'
      }]
    }
  },
  modules: ['nuxt-monaco-editor']
})
