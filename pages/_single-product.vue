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
          :alt="this.pageData.img.alternativeText"
          :title="this.pageData.img.caption"
        />

        <p>
          <strong>{{ pageData.price | formatCurrency }}</strong>
        </p>

        <v-btn type="button" @click="onAddToCartBtnClick">Добавить в корзину</v-btn>
      </div>

      <div v-else class="container">
        Loading...
      </div>
    </section>
  </fragment>
</template>

<script>
import microdata from '@/mixins/microdata'
import head from '@/mixins/head'
import { PRODUCTS } from '@/assets/scripts/pageTypes'

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
  methods: {
    onAddToCartBtnClick() {
      this.$store.commit('cart/add', this.pageData)

      console.log(this.$store.getters['cart/items'])
    },
  },
  mounted() {
    this.isLoaded = true
  },
}
</script>
