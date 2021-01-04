export const state = () => ({
  isLoaded: false,
})

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
      console.error('server error')
    }
  },
}
