<template>
  <fragment>
    <div v-if="pageBreadcrumbs.length > 1" class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>
    <page-home v-if="pageName === pageTypes.HOME" :page-data="pageData" />
    <page-posts v-else-if="pageName === pageTypes.POSTS" :page-data="pageData" />
    <page-products v-else-if="pageName === pageTypes.PRODUCTS" :page-data="pageData" />
    <page-cart v-else-if="pageName === pageTypes.CART" :page-data="pageData" />
    <page v-else :page-data="pageData" />

    <!-- <section class="section">
      <div class="container">
        <v-feedback-form v-if="feedbackForm" :form="feedbackForm" />
      </div>
    </section> -->
  </fragment>
</template>

<script>
import homePath from '~/mixins/home-path'
import microdata from '~/mixins/microdata'
import PageHome from '~/pages/index'
import PagePosts from '~/pages/posts'
import PageProducts from '~/pages/catalog'
import PageCart from '~/pages/cart'
import Page from '~/pages/page'
import head from '~/mixins/head'
import { POSTS, PRODUCTS, CART, PAGES } from '~/assets/scripts/pageTypes'

export default {
  name: 'SinglePage',
  components: {
    Page,
    PageHome,
    PagePosts,
    PageProducts,
    PageCart,
  },
  mixins: [homePath, microdata, head],
  data() {
    return {
      feedbackForm: null,
      pageData: {},
      pageTypes: {
        HOME: 'home',
        POSTS,
        PRODUCTS,
        CART,
      },
    }
  },
  computed: {
    pageName() {
      if (!this.$route.name) return this.pageTypes.HOME

      const [name] = this.$route.name.split('---')
      return name
    },
  },
  async created() {
    const pageId = this.$route.meta.id

    if (this.$store.state[PAGES][pageId]) {
      this.pageData = this.$store.state[PAGES][pageId]
    } else {
      this.pageData = await this.$store.dispatch('fetchCollection', {
        collection: PAGES,
        id: pageId,
      })
      this.$store.commit('setCollection', {
        data: this.pageData,
        collection: PAGES,
        id: pageId,
      })
    }

    this.feedbackForm = await this.$store.dispatch('form/fetchFeedbackForm')
  },
}
</script>
