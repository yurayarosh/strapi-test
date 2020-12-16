export const state = () => ({})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
}

export const actions = {
  async fetchPosts({ commit }) {
    try {
      const response = await fetch(`${process.env.BACKEND_HOST}/posts`)
      const posts = await response.json()

      commit('setPosts', posts)
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
}

export const getters = {
  posts: ({ posts }) => posts,
}
