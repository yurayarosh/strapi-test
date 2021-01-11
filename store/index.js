import { PAGES, POSTS, PRODUCTS } from "~/assets/scripts/pageTypes"

export const state = () => ({
  isLoaded: false,
  [PAGES]: {},
  [POSTS]: {},
  [PRODUCTS]: {},
})

export const mutations = {
  setCollection(state, { data, collection, filter, id }) {
    if (id) {
      state[collection][id] = data      
    }
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
      // eslint-disable-next-line
      console.error(`Fetching "${collection}" collection error`, error)
    }
  },
}
