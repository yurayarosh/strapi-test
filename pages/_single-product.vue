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

        <p>
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
import { PRODUCTS } from '~/assets/scripts/pageTypes'

export default {
  mixins: [microdata, head],
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
  async created() {
    this.pageData = await this.$store.dispatch('fetchCollection', {
      collection: 'products',
      id: this.$route.meta.id,
    })
    this.productsPage = (
      await this.$store.dispatch('fetchCollection', {
        collection: 'pages',
        filter: { alias: PRODUCTS },
      })
    )[0]
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
