<template>
  <fragment>
    <div class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>

    <section class="section">
      <div v-if="isLoaded" class="container">
        <h1>{{ pageData[`title_${LANGUAGE}`] }}</h1>
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
