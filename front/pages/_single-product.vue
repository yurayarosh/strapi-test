<template>
  <fragment>
    <div class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>

    <section class="section">
      <div v-if="isLoaded" class="container">
        this is product
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
  async fetch() {
    this.pageData = await this.$store.dispatch('products/fetchProduct', this.$route.meta.id)
    this.productsPage = (await this.$store.dispatch('pages/fetchPages', { alias: PRODUCTS }))[0]
  },
  data() {
    return {
      isLoaded: false,
      pageData: {},
      productsPage: {},
    }
  },
  mounted() {
    this.isLoaded = true
  },
}
</script>
