export default defineNuxtConfig({
  css: ['~/styles.css'],

  modules: [
    '../dist/module'
  ],

  monacoEditor: {
    locale: 'ja'
  },

  compatibilityDate: '2024-10-19'
})
