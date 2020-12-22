<template>
  <div class="page">
    <v-breadcrumbs :list="pageBreadcrumbs" class="page__breadcrumbs" />

    <section class="section">
      <div v-if="isLoaded" class="container">
        <div class="article__inner" v-html="pageData[`text_${LANGUAGE}`]" />
      </div>

      <div v-else class="container">
        Loading...
      </div>
    </section>
  </div>
</template>

<script>
import microdata from '@/mixins/microdata'
import head from '@/mixins/head'

export default {
  mixins: [microdata, head],
  async fetch() {
    this.pageData = await this.$store.dispatch('posts/fetchPost', this.$route.meta.id)
    this.postsPage = await this.$store.dispatch('pages/fetchPage', this.pageData.parent_page.id)
  },
  data() {
    return {
      isLoaded: false,
    }
  },  
  mounted() {
    this.isLoaded = true
  },
}
</script>
