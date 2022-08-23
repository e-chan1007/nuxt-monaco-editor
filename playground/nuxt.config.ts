import { defineNuxtConfig } from 'nuxt'
import MonacoEditorModule from '..'

export default defineNuxtConfig({
  css: ['~/styles.scss'],
  modules: [
    MonacoEditorModule
  ]
})
