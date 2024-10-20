const GITHUB_URL = 'https://github.com/e-chan1007/nuxt-monaco-editor'

export default defineAppConfig({
  shadcnDocs: {
    site: {
      url: 'https://e-chan1007.github.io/',
      name: 'Nuxt Monaco Editor',
      description: 'The easiest way to get along with Monaco Editor.'
    },
    theme: {
      customizable: false,
      color: 'blue',
      radius: 0.5
    },
    header: {
      title: 'Nuxt Monaco Editor',
      showTitle: true,
      darkModeToggle: true,
      nav: [],
      links: [{
        icon: 'lucide:github',
        to: GITHUB_URL,
        target: '_blank'
      }]
    },
    aside: {
      useLevel: false,
      collapse: false
    },
    main: {
      breadCrumb: true,
      showTitle: false
    },
    footer: {
      credits: 'Copyright © 2024',
      links: [{
        icon: 'lucide:github',
        to: GITHUB_URL,
        target: '_blank'
      }]
    },
    toc: {
      enable: true,
      title: 'On This Page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: GITHUB_URL,
        target: '_blank'
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: `${GITHUB_URL}/issues`,
        target: '_blank'
      }]
    }
  }
})
