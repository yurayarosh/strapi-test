import Vue from 'vue'
import Router from 'vue-router'

import SinglePost from '@/pages/_single-post'
import Home from '@/pages/index'
import Posts from '@/pages/posts'

Vue.use(Router)

const langConfig = {
  languages: ['ru', 'uk'],
  default: 'ru',
}

let siteRoutes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      language: langConfig.default,
    },
  },
  {
    name: 'posts',
    path: '/posts',
    component: Posts,
    meta: {
      language: langConfig.default,
    },
  },
]

langConfig.languages.forEach(lang => {
  const { default: def } = langConfig
  if (lang === def) return

  const routes = []
  const langName = lang === 'uk' ? 'ua' : lang

  siteRoutes.forEach(({ name, path, component }) => {
    name = `${name}-${lang}`
    path = `/${langName}${path}`

    routes.push({
      name,
      path,
      component,
      meta: {
        language: lang,
      },
    })
  })

  siteRoutes = [...siteRoutes, ...routes]
})

const getPosts = async () => {
  const { default: def, languages } = langConfig
  const response = await fetch(`${process.env.BACKEND_HOST}/posts`)
  const posts = await response.json()
  const routes = []

  languages.forEach(lang => {
    posts.forEach(({ alias }) => {
      const langName = lang === 'uk' ? 'ua' : lang
      const subdir = lang === def ? '' : `/${langName}`
      const name = lang === def ? alias : `${alias}-${langName}`

      routes.push({
        name,
        path: `${subdir}/${alias}`,
        component: SinglePost,
        meta: {
          language: lang,
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
      ...(await getPosts()),
      ...siteRoutes,
    ],
  })
}
