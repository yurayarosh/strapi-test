<template>
  <fragment>
    <div v-if="pageBreadcrumbs.length > 1" class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>
    <page-home v-if="pageName === pageTypes.HOME" :page-data="pageData" />
    <page-posts v-else-if="pageName === pageTypes.POSTS" :page-data="pageData" />
    <page-products v-else-if="pageName === pageTypes.PRODUCTS" :page-data="pageData" />
    <page v-else :page-data="pageData" />

    <!-- <section class="section">
      <div class="container">
        <v-feedback-form v-if="feedbackForm" :form="feedbackForm" />
      </div>
    </section> -->
  </fragment>
</template>

<script>
import homePath from '@/mixins/home-path'
import microdata from '@/mixins/microdata'
import PageHome from '@/pages/index'
import PagePosts from '@/pages/posts'
import PageProducts from '@/pages/catalog'
import Page from '@/pages/page'
import head from '@/mixins/head'
import { POSTS, PRODUCTS } from '@/assets/scripts/pageTypes'

export default {
  name: 'SinglePage',
  components: {
    Page,
    PageHome,
    PagePosts,
    PageProducts,
  },
  mixins: [homePath, microdata, head],
  async fetch() {
    this.pageData = await this.$store.dispatch('fetchCollection', {
      collection: 'pages',
      id: this.$route.meta.id,
    })
    this.feedbackForm = await this.$store.dispatch('form/fetchFeedbackForm')
  },
  data() {
    return {
      feedbackForm: null,
      pageData: {},
      pageTypes: {
        HOME: 'home',
        POSTS,
        PRODUCTS,
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
}
</script>
