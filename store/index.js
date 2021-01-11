import { PAGES, POSTS, PRODUCTS } from "~/assets/scripts/pageTypes"

export const state = () => ({
  isLoaded: false,
  [PAGES]: {},
  [POSTS]: {},
  [PRODUCTS]: {},
  productsHasBeenFetched: false,
  postsHasBeenFetched: false,
})

export const mutations = {
  setCollection(state, { data, collection, id }) {
    if (id) {
      state[collection][id] = data      
    } else {
      state[collection] = data
    }
  },
  setProducts(state) {
    state.productsHasBeenFetched = true
  },
  setPosts(state) {
    state.postsHasBeenFetched = true
  },
}

export const actions = {
  async fetchCollection(ctx, { collection = '', filter, id }) {
    let filterString = ''

    if (filter) {
      filterString = '?'

      Object.keys(filter).forEach((key, i) => {
        filterString += `${key}=${Object.values(filter)[i]}&`
      })

      filterString = filterString.slice(0, -1)
    }

    if (id) {
      filterString = `/${id}`
    }

    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/${collection}${filterString}`)
      return await response.json()
    } catch (error) {
      console.error(`Fetching "${collection}" collection error`, error)
    }
  },
}

export const getters = {
  productsHasBeenFetched: ({ productsHasBeenFetched }) => productsHasBeenFetched,
  postsHasBeenFetched: ({ postsHasBeenFetched }) => postsHasBeenFetched,
}
