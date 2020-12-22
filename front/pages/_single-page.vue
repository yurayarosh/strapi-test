<template>
  <div class="page">
    <v-breadcrumbs :list="pageBreadcrumbs" class="page__breadcrumbs" />
    <page-home v-if="pageName === 'home'" />
    <page-posts v-else-if="pageName === 'posts'" />
  </div>
</template>

<script>
import homePath from '@/mixins/home-path'
import microdata from '@/mixins/microdata'
import PageHome from '@/pages/index'
import PagePosts from '@/pages/posts'
import head from '@/mixins/head'

export default {
  name: 'SinglePage',
  components: {
    PageHome,
    PagePosts,
  },
  mixins: [homePath, microdata, head],
  async fetch() {
    this.pageData = await this.$store.dispatch('pages/fetchPage', this.$route.meta.id)
  },
  computed: {
    pageName() {
      if (!this.$route.name) return 'home'

      const [name] = this.$route.name.split('---')
      return name
    },
  },
}
</script>

<style lang="sass">
.page
  &__breadcrumbs
    margin-bottom: 30px
    margin-top: 30px
</style>
