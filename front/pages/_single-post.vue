<template>
  <div class="page">
    <v-breadcrumbs :list="breadcrumbs" class="page__breadcrumbs" />

    <section class="section">
      <div v-if="isLoaded" class="container">
        <h1>{{ post[`title_${LANGUAGE}`] }}</h1>

        <div v-html="post[`text_${LANGUAGE}`]" class="article__inner"></div>
      </div>

      <div v-else class="container">
        Loading...
      </div>
    </section>
  </div>
</template>

<script>
import homePath from '@/mixins/home-path'

export default {
  mixins: [homePath],
  data() {
    return {
      isLoaded: false,
      post: {},
      postsPage: {},
      navList: [],
    }
  },
  computed: {
    breadcrumbs() {
      const list = this.postsPage.parents_pages?.map(page => {
        const [navItem] = this.navList.filter(({ id }) => id === page.nav_item)
        const url = page.alias === null ? this.homePath : `/${page.alias}`

        return {
          url,
          text: navItem[`title_${this.LANGUAGE}`],
        }
      })

      if (!list?.length) return []

      const [postsNavitem] = this.navList.filter(({ id }) => id === this.postsPage.id)

      list.push({
        url: `${this.postsPage.alias}`,
        text: postsNavitem[`title_${this.LANGUAGE}`],
      })
      list.push({
        text: this.post[`title_${this.LANGUAGE}`],
      })

      return list
    },
  },
  async fetch() {
    this.post = await this.$store.dispatch('posts/fetchPost', this.$route.meta.id)
    this.postsPage = await this.$store.dispatch('pages/fetchPage', this.post.parent_page.id)
    this.navList = this.$store.getters['pages/navList']
  },
  mounted() {
    this.isLoaded = true
  },
}
</script>
