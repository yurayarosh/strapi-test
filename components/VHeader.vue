<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <component
          :is="isHome ? 'div' : 'nuxt-link'"
          class="header__logo logo"
          :to="!isHome ? homePath : false"
          >logo</component
        >

        <v-nav class="header__nav" />

        <nuxt-link class="header__cart" :to="cartPageUrl"
          >cart <span>{{ cartQuantity }}</span></nuxt-link
        >

        <v-lang class="header__lang" />
      </div>
    </div>
  </header>
</template>

<script>
import Cookies from 'js-cookie'
import homePath from '@/mixins/home-path'
import { CART } from '@/assets/scripts/pageTypes'

export default {
  name: 'VHeader',
  mixins: [homePath],
  computed: {
    isHome() {
      return !this.$route.name
    },
    cartQuantity() {
      return this.$store.getters['cart/numberOfItems']
    },
    cartPageUrl() {
      if (this.LANGUAGE === 'uk') return `/ua/${CART}`
      return `/${CART}`
    },
  },
  mounted() {
    if (Cookies.get('cart')) {
      const cartItems = JSON.parse(Cookies.get('cart'))
      console.log({ cartItems })
      this.$store.commit('cart/setItems', cartItems)
    }
  },
}
</script>

<style lang="sass">
.header
  background-color: #ccc

  &__inner
    display: flex
    align-items: center
    justify-content: space-between
    height: 60px

  &__cart
    margin-left: auto
    margin-right: 15px
</style>
