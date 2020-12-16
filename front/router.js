import Vue from 'vue'
import Router from 'vue-router'

import SinglePage from '@/pages/_single-page'
import SinglePost from '@/pages/_single-post'
import { langConfig } from '@/assets/scripts/utils'

Vue.use(Router)

const getRoutes = async (collection = 'pages', component) => {
  const { default: def, languages } = langConfig
  const response = await fetch(`${process.env.BACKEND_HOST}/${collection}`)
  const items = await response.json()
  const routes = []

  languages.forEach(language => {
    items.forEach(({ alias, id }) => {
      if (alias === null) alias = ''
      const langName = language === 'uk' ? 'ua' : language
      const subdir = language === def ? '' : `/${langName}`
      let name = ''

      if (alias) name = language === def ? alias : `${alias}---${langName}`

      routes.push({
        name,
        component,
        path: `${subdir}/${alias}`,
        meta: {
          id,
          language,
        },
      })
    })
  })

  return routes
}

export async function createRouter() {
  return new Router({
    mode: 'history',
    routes: [...(await getRoutes('pages', SinglePage)), ...(await getRoutes('posts', SinglePost))],
  })
}
