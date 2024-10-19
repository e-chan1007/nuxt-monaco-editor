export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'shadcn-docs-nuxt',
      description: 'The easiest way to get along with Monaco Editor.'
    },
    theme: {
      customizable: true,
      color: 'zinc',
      radius: 0.5
    },
    header: {
      title: 'shadcn-docs-starter',
      showTitle: true,
      darkModeToggle: true,
      logo: {
        light: '/logo.svg',
        dark: '/logo-dark.svg'
      },
      nav: [],
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt',
        target: '_blank'
      }]
    },
    aside: {
      useLevel: true,
      collapse: false
    },
    main: {
      breadCrumb: true,
      showTitle: true
    },
    footer: {
      credits: 'Copyright © 2024',
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt',
        target: '_blank'
      }]
    },
    toc: {
      enable: true,
      title: 'On This Page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt',
        target: '_blank'
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt/issues',
        target: '_blank'
      }]
    },
    search: {
      enable: true,
      inAside: false
    }
  }
})
