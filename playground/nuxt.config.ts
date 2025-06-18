import NuxtMonacoEditor from "../dist/module.mjs";
export default defineNuxtConfig({
  css: ['~/styles.css'],

  modules: [
    NuxtMonacoEditor
  ],

  monacoEditor: {
    locale: 'ja'
  },

  compatibilityDate: '2024-10-19'
})
