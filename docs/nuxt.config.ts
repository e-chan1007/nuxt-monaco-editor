// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["shadcn-docs-nuxt"],
  modules: ["../src/module"],
  compatibilityDate: "2026-07-23",
  site: {
    url: "https://e-chan1007.github.io/",
    name: "Nuxt Monaco Editor",
    description: "The easiest way to get along with Monaco Editor.",
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
      },
      {
        code: "ja",
        name: "日本語",
        language: "ja-JP",
      },
    ],
  },
  content: {
    highlight: {
      langs: ["bash", "ts", "vue"],
    },
  },
  ogImage: {
    zeroRuntime: true,
  },
  twoslash: {
    handbookOptions: {
      noErrorsCutted: true,
      noErrorValidation: true
    }
  },
});
