<template>
  <div class="page">
    <v-breadcrumbs :list="breadcrumbs" class="page__breadcrumbs" />
    <page-home v-if="pageName === 'home'" />
    <page-posts v-else-if="pageName === 'posts'" />
  </div>
</template>

<script>
import homePath from '@/mixins/home-path'
import PageHome from '@/pages/index'
import PagePosts from '@/pages/posts'

export default {
  name: 'SinglePage',
  mixins: [homePath],
  components: {
    PageHome,
    PagePosts,
  },
  data() {
    return {
      pageData: {},
    }
  },
  computed: {
    pageName() {
      if (!this.$route.name) return 'home'

      const [name] = this.$route.name.split('---')
      return name
    },
    breadcrumbs() {
      if (!this.pageData.parents_pages?.length) return []

      const [currentNavItem] = this.$store.getters['pages/navList'].filter(({ id }) => id === this.$route.meta.id)

      const list = this.pageData.parents_pages.map(page => {
        const [navItem] = this.$store.getters['pages/navList'].filter(({ id }) => id === page.nav_item)
        const url = page.alias === null ? this.homePath : page.alias

        return {
          url,
          text: navItem[`title_${this.LANGUAGE}`],
        }
      })

      list.push({
        text: currentNavItem[`title_${this.LANGUAGE}`],
      })

      return list
    },
  },
  async fetch() {
    this.pageData = await this.$store.dispatch('pages/fetchPage', this.$route.meta.id)
  },
}
</script>

<style lang="sass">
.page
  &__breadcrumbs
    margin-bottom: 30px
    margin-top: 30px
</style>
