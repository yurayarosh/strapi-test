export const state = () => ({})

export const mutations = {
  setPages(state, pages) {
    state.pages = pages
  },
  setNavList(state, list) {
    state.navList = list
  },
}

export const actions = {
  async fetchPages({ commit }) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/pages`)
      const pages = await response.json()

      commit('setPages', pages)
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
  async fetchNavList({ commit }) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/nav-items`)
      const navigation = await response.json()

      commit('setNavList', navigation)
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
  async fetchPage(ctx, id) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/pages/${id}`)
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  },
  async fetchnavItem(ctx, id) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/nav-items/${id}`)
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  },
}

export const getters = {
  pages: ({ pages }) => pages,
  navList: ({ navList }) => navList,
}
