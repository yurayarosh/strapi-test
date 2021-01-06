// import jsCookies from 'js-cookie'

export const state = () => ({
  items: [],
  translations: {},
})

export const actions = {
  async fetchCartTranslations({ commit }) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/cart`)
      const data = await response.json()

      commit('setCartTranslations', data)
    } catch (error) {
      console.error('Fetching cart data error', error)
    }
  },
}

export const mutations = {
  setItems(state, items) {
    state.items = items
    // jsCookies.set('cart', state.items)
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  add(state, item) {
    const record = state.items.find(({ id }) => id === item.id)

    if (!record) {
      state.items.push({
        ...item,
        quantity: 1,
      })
    } else {
      record.quantity++
    }

    // jsCookies.set('cart', state.items)
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  remove(state, item) {
    const record = state.items.find(({ id }) => id === item.id)

    if (record.quantity > 1) {
      record.quantity--
    } else {
      const index = state.items.findIndex(({ id }) => id === item.id)
      state.items.splice(index, 1)
    }
    // jsCookies.set('cart', state.items)
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  emptyList(state) {
    state.items = []
    // jsCookies.set('cart', state.items)
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  setCartTranslations(state, translations) {
    state.translations = translations
  },
}

export const getters = {
  items: ({ items }) => items,
  translations: ({ translations }) => translations,
  price: ({ items }) => items.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
  numberOfItems: ({ items }) => items.reduce((acc, { quantity }) => acc + quantity, 0),
}
