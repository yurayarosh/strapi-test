<template>
  <div class="page">
    <v-breadcrumbs :list="pageBreadcrumbs" class="page__breadcrumbs" />

    <section class="section">
      <div v-if="isLoaded" class="container">
        <div v-html="pageData[`text_${LANGUAGE}`]" class="article__inner"></div>
      </div>

      <div v-else class="container">
        Loading...
      </div>
    </section>
  </div>
</template>

<script>
import microdata from '@/mixins/microdata'

export default {
  mixins: [microdata],
  data() {
    return {
      isLoaded: false,
    }
  },
  async fetch() {
    this.pageData = await this.$store.dispatch('posts/fetchPost', this.$route.meta.id)
    this.postsPage = await this.$store.dispatch('pages/fetchPage', this.pageData.parent_page.id)
  },
  mounted() {
    this.isLoaded = true
  },
}
</script>
