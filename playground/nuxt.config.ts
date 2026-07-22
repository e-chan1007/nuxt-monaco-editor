import NuxtMonacoEditor from "../dist/module.mjs";
export default defineNuxtConfig({
  css: ['~/styles.css'],
  modules: [
    NuxtMonacoEditor
  ],
  compatibilityDate: '2026-07-23'
})
