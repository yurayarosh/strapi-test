export const state = () => ({})

export const mutations = {
  setNavList(state, list) {
    state.navList = list
  },
}

export const actions = {
  async fetchNavList({ commit }) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/nav-items`)
      const navigation = await response.json()

      commit('setNavList', navigation)
    } catch (error) {
      console.error('Fetching nav-items error', error)
    }
  },
  async fetchNavItem(ctx, id) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/nav-items/${id}`)
      return await response.json()
    } catch (error) {
      console.error(`Fetching nav-item id=${id} error`, error)
    }
  },
}

export const getters = {
  navList: ({ navList }) => navList,
}
