<template>
  <component :is="url ? 'nuxt-link' : 'div'" :to="url || false" class="card">
    <span class="card__img">
      <img v-if="imgUrl" :src="`${imgUrl}`" :alt="img.alternativeText" :title="img.caption" />
    </span>
    <span class="card__content">
      <span class="card__title">{{ title }}</span>

      <span v-if="description" class="card__text">{{ description }}</span>

      <span class="card__footer">
        <span class="card__price">{{ price }}</span>
        <span v-if="quantity" class="card__quantity"
          >{{ cartQuantityTitle }} <input type="number" :value="quantity" @change="onQuantityInputChange"
        /></span>

        <button class="close" v-if="remove" type="button" @click="onRemoveBtnClick"></button>
      </span>
    </span>
  </component>
</template>

<script>
import language from '@/mixins/language'

export default {
  name: 'VProductCard',
  mixins: [language],
  props: {
    remove: {
      type: Boolean,
      default: () => false,
    },
    itemId: {
      type: [String, Number],
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    img: {
      type: Object,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      BASE_URL_BACK: process.env.BASE_URL_BACK,
    }
  },
  computed: {
    imgUrl() {
      if (!this.img) return ''
      return this.img.formats.medium?.url || this.img.url
    },
    productsInCart() {
      return this.$store.getters['cart/items']
    },
    record() {
      const meta = this.productsInCart.find(({ id }) => id === this.itemId)
      const index = this.productsInCart.indexOf(meta)

      return {
        meta,
        index,
      }
    },
    cartQuantityTitle() {
      return this.$store.getters['cart/translations']?.[`quantity_${this.LANGUAGE}`]
    },
  },
  methods: {
    onQuantityInputChange({ target: { value } }) {
      const updatedProducts = [...this.productsInCart]
      updatedProducts.splice(this.record.index, 1, {
        ...this.record.meta,
        quantity: +value,
      })

      this.$store.commit('cart/setItems', updatedProducts)
    },
    onRemoveBtnClick() {
      const updatedProducts = [...this.productsInCart]
      updatedProducts.splice(this.record.index, 1)

      this.$store.commit('cart/setItems', updatedProducts)
    },
  },
}
</script>

<style lang="sass">
.card
  &__img
    display: block
    width: 100%
    margin-bottom: 15px
    font-size: 0
    position: relative
    padding-top: 60%
    background-color: #ccc

    img
      @extend %coverdiv
      @extend %coverimage

  &__content
    display: flex
    flex-direction: column
    flex-grow: 1

  &__title
    display: block
    margin-bottom: 15px
    font-size: 1.5em
    font-weight: 700

  &__text
    flex-grow: 1

  &__price
    display: block
</style>
