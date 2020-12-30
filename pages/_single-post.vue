<template>
  <fragment>
    <div class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>

    <section class="section">
      <div v-if="isLoaded" class="container">
        <div class="article__inner" v-html="pageData[`text_${LANGUAGE}`]" />
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
import { POSTS } from '@/assets/scripts/pageTypes'

export default {
  mixins: [microdata, head],
  async fetch() {
    this.pageData = await this.$store.dispatch('fetchCollection', {
      collection: 'posts',
      id: this.$route.meta.id,
    })
    this.postsPage = (
      await this.$store.dispatch('fetchCollection', {
        collection: 'pages',
        filter: { alias: POSTS },
      })
    )[0]
  },
  data() {
    return {
      pageData: {},
      postsPage: {},
      isLoaded: false,
    }
  },
  mounted() {
    this.isLoaded = true
  },
}
</script>
