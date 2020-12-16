export const state = () => ({})

export const mutations = {
  setPages(state, pages) {
    state.pages = pages
  },
}

export const actions = {
  async fetchPages({ commit }) {
    try {
      const response = await fetch(`${process.env.BACKEND_HOST}/pages`)
      const pages = await response.json()

      commit('setPages', pages)
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
}

export const getters = {
  pages: ({ pages }) => pages,
}
