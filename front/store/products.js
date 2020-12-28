export const state = () => ({})

export const actions = {
  async fetchProducts() {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/products`)
      return await response.json()
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
  async fetchProduct(ctx, id) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/products/${id}`)
      return await response.json()
    } catch (error) {
      // eslint-disable-next-line
      console.error('server error')
    }
  },
}
