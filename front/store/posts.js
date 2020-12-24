export const state = () => ({})

export const actions = {
  async fetchPosts() {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/posts`)
      return await response.json()
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
  async fetchPost(ctx, id) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/posts/${id}`)
      return await response.json()
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
}
