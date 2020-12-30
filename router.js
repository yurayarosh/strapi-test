import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'

import SinglePage from './pages/_single-page'
import SinglePost from './pages/_single-post'
import SingleProduct from './pages/_single-product'
import { langConfig } from './assets/scripts/utils'
import { PAGES, POSTS, PRODUCTS, PAGE, POST, PRODUCT } from './assets/scripts/pageTypes'

Vue.use(Router)

const getRoutes = async (collection = 'pages', component) => {
  const { default: def, languages } = langConfig
  const response = await axios.get(`${process.env.BASE_URL_BACK}/${collection}`)
  const { data: items } = response
  let pageType

  switch (collection) {
    case PAGES:
      pageType = PAGE
      break
    case POSTS:
      pageType = POST
      break
    case PRODUCTS:
      pageType = PRODUCT
      break
    default:
      pageType = PAGE
      break
  }

  const routes = []

  languages.forEach(language => {
    items.forEach(({ alias, id }) => {
      if (!alias) alias = ''
      const langName = language === 'uk' ? 'ua' : language
      const subdir = language === def || !langName ? '' : `/${langName}`
      let name = ''

      if (alias) name = language === def ? alias : `${alias}---${langName}`

      routes.push({
        name,
        component,
        path: `${subdir}/${alias}`,
        meta: {
          id,
          language,
          type: pageType,
        },
      })
    })
  })

  return routes
}

export async function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      ...(await getRoutes('pages', SinglePage)), 
      ...(await getRoutes('posts', SinglePost)),
      ...(await getRoutes('products', SingleProduct)),
    ],
  })
}
