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

export default {
  name: 'SinglePage',
  // head() {
  //   return {
  //     title: 'blah',
  //   }
  // },
  mixins: [homePath, microdata],
  components: {
    PageHome,
    PagePosts,
  },
  computed: {
    pageName() {
      if (!this.$route.name) return 'home'

      const [name] = this.$route.name.split('---')
      return name
    },
  },
  async fetch() {
    this.pageData = await this.$store.dispatch('pages/fetchPage', this.$route.meta.id)
  },
  mounted() {
    // console.log(this.$route.meta)
  },
}
</script>

<style lang="sass">
.page
  &__breadcrumbs
    margin-bottom: 30px
    margin-top: 30px
</style>
