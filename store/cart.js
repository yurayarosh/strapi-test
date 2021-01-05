import Cookies from 'js-cookie'

export const state = () => ({
  items: [],
})

export const mutations = {
  setItems(state, items) {
    state.items = items
    Cookies.set('cart', state.items)
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

    // Cookies.remove('cart')
    // setTimeout(() => {
    //   Cookies.set('cart', state.items)
    //   console.log('cookies set', state.items)
    // }, 400)

    Cookies.set('cart', state.items)
  },
  remove(state, item) {
    const record = state.items.find(({ id }) => id === item.id)

    if (record.quantity > 1) {
      record.quantity--
    } else {
      const index = state.items.findIndex(({ id }) => id === item.id)
      state.items.splice(index, 1)
    }
    Cookies.set('cart', state.items)
  },
  emptyList(state) {
    state.items = []
    Cookies.set('cart', state.items)
  },
}

export const getters = {
  items: state => state.items,
  price: state => state.items.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
  numberOfItems: state => state.items.reduce((acc, { quantity }) => acc + quantity, 0),
}
