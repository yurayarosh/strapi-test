// import axios from 'axios'
// import { langConfig } from './assets/scripts/utils'

// const getRoutes = async (collection = 'pages') => {
//   const { default: def, languages } = langConfig
//   const response = await axios.get(`${process.env.BASE_URL_BACK}/${collection}`)
//   const { data: items } = response

//   const routes = []

//   languages.forEach(language => {
//     items.forEach(({ alias }) => {
//       if (!alias) alias = ''
//       const langName = language === 'uk' ? 'ua' : language
//       const subdir = language === def || !langName ? '' : `/${langName}`

//       routes.push({
//         route: `${subdir}/${alias}`,
//       })
//     })
//   })

//   return routes
// }

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_BACK: process.env.BASE_URL_BACK,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'new-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/app.sass'],

  styleResources: {
    sass: ['@/assets/styles/helpers/_all.sass'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/jsonld', '@/plugins/filters', '@/plugins/fragment'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/router',
    '@nuxtjs/pwa',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/style-resources', '@nuxtjs/dotenv'],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  router: {
    trailingSlash: false,
    middleware: 'trailingSlashRedirect',
  },

  // generate: {
  //   async routes() {
  //     return [
  //       ...(await getRoutes('pages')),
  //       ...(await getRoutes('posts')),
  //       ...(await getRoutes('products')),
  //     ]
  //   },
  // },

  pwa: {
    icon: {
      source: '/icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: 'My Awesome App',
      lang: 'fa',
      useWebmanifestExtension: false,
      theme_color: '#ffffff',
    },
    // workbox: {
    //   cachingExtensions: '@/plugins/workbox-sync.js',
    //   enabled: true //should be off actually per workbox docs due to complications when used in prod
    // },
  }
}
