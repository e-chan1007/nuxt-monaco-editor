export default defineNuxtConfig({
  extends: 'shadcn-docs-nuxt',

  app: {
    head: {
      meta: [{
        name: 'google-site-verification', content: 'rzH-lFve_O6XXzhNiijEf4BZjsqeP_fGozFLwK1T-lQ'
      }]
    }
  },

  modules: ['../src/module'],
  compatibilityDate: '2024-10-19'
})
