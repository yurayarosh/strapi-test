<template>
  <fragment>
    <div class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>

    <section class="section">
      <div v-if="isLoaded" class="container">
        <h1>{{ pageData[`title_${LANGUAGE}`] }}</h1>

        <img
          v-if="imgUrl"
          :src="`${imgUrl}`"
          :alt="pageData.img.alternativeText"
          :title="pageData.img.caption"
        />

        <p v-if="pageData.price">
          <strong>{{ pageData.price | formatCurrency }}</strong>
        </p>

        <v-btn v-if="cartAddButton" type="button" @click="onAddToCartBtnClick">{{
          cartAddButton[`title_${LANGUAGE}`]
        }}</v-btn>
      </div>

      <div v-else class="container">
        Loading...
      </div>
    </section>
  </fragment>
</template>

<script>
import microdata from '~/mixins/microdata'
import head from '~/mixins/head'
import fetchDynamicPage from '~/assets/scripts/fetchDynamicPage'
import { PAGES, PRODUCTS } from '~/assets/scripts/pageTypes'

export default {
  mixins: [microdata, head],
  async fetch() {
    const { pageData, rootPage } = await fetchDynamicPage({
      ctx: this,
      collection: PRODUCTS,
    })

    this.pageData = pageData
    this.productsPage = rootPage
  },
  data() {
    return {
      isLoaded: false,
      pageData: {},
      productsPage: {},
    }
  },
  computed: {
    imgUrl() {
      if (!this.pageData.img) return ''
      return this.pageData.img.formats.medium?.url || this.pageData.img.url
    },
    cartAddButton() {
      return this.$store.getters['cart/translations']?.add_button
    },
  },
  mounted() {
    this.isLoaded = true
  },
  methods: {
    onAddToCartBtnClick() {
      this.$store.commit('cart/add', this.pageData)
    },
  },
}
</script>
