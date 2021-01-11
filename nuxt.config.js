// TODO: use if target: 'static' is seted.
import axios from 'axios'
import { PAGES, POSTS, PRODUCTS } from './assets/scripts/pageTypes'
import { langConfig } from './assets/scripts/utils'

const getRoutes = async (collection = PAGES) => {
  const { default: def, languages } = langConfig
  const response = await axios.get(`${process.env.BASE_URL_BACK}/${collection}`)
  const { data: items } = response

  const routes = []

  languages.forEach(language => {
    items.forEach(({ alias }) => {
      if (!alias) alias = ''
      const langName = language === 'uk' ? 'ua' : language
      const subdir = language === def || !langName ? '' : `/${langName}`

      routes.push({
        route: `${subdir}/${alias}`,
      })
    })
  })

  return routes
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_BACK: process.env.BASE_URL_BACK,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.BASE_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/app.sass'],

  styleResources: {
    sass: ['~/assets/styles/helpers/_all.sass'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/jsonld', '~/plugins/filters', '~/plugins/fragment'],

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
  modules: ['@nuxtjs/style-resources', '@nuxtjs/dotenv', '@nuxtjs/sitemap'],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  router: {
    trailingSlash: false,
    // middleware: 'trailingSlashRedirect',
  },

  // TODO: use if target: 'static' is seted.
  generate: {
    async routes() {
      return [
        ...(await getRoutes(PAGES)),
        ...(await getRoutes(POSTS)),
        ...(await getRoutes(PRODUCTS)),
      ]
    },
  },

  pwa: {
    icon: {
      source: '/icon.png',
    },
    manifest: {
      name: process.env.BASE_NAME,
      lang: langConfig.default,
      useWebmanifestExtension: false,
      theme_color: '#ffffff',
    },
    // workbox: {
    //   cachingExtensions: '~/plugins/workbox-sync.js',
    //   enabled: true //should be off actually per workbox docs due to complications when used in prod
    // },
  },

  sitemap: {
    hostname: process.env.BASE_URL,
  },
}
