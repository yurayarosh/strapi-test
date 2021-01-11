import { PAGES } from './pageTypes'

export default async ({ ctx, collection }) => {
  const { id } = ctx.$route.meta
  let pageData = {}
  let rootPage = {}

  if (ctx.$store.state[collection][id]) {
    pageData = ctx.$store.state[collection][id]
  } else {
    pageData = await ctx.$store.dispatch('fetchCollection', {
      collection,
      id,
    })
    ctx.$store.commit('setCollection', {
      collection,
      id,
      data: pageData,
    })
  }

  const rootPageData = 
    Object.values(ctx.$store.state[PAGES]).find(({ alias }) => alias === collection)

  if (rootPageData) {
    rootPage = rootPageData
  } else {
    rootPage = (
      await ctx.$store.dispatch('fetchCollection', {
        collection: PAGES,
        filter: { alias: collection },
      })
    )[0]
    ctx.$store.commit('setCollection', {
      collection: PAGES,
      data: rootPageData,
      id: rootPage.id,
    })
  }

  return {
    pageData,
    rootPage,
  }
}
