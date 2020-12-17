<template>
  <section class="section">
    <v-breadcrumbs class="section__breadcrumbs" :list="breadcrumbs" />

    <ul v-if="isLoaded" class="posts">
      <li v-for="post in posts" :key="post.id" class="posts__item">
        <v-post
          :url="post.alias"
          :title="post[`title_${LANGUAGE}`]"
          :img="post.img"
          :description="post[`description_${LANGUAGE}`]"
          :date="post.published_at"
        />
      </li>
    </ul>

    <p v-else class="loader">Loading...</p>
  </section>
</template>

<script>
import microdata from '@/mixins/microdata'

export default {
  name: 'PagePosts',
  mixins: [
    microdata,
  ],
  data() {
    const { BASE_URL } = process.env

    return {
      LANGUAGE: this.$route.meta.language,
      name: '',
      isLoaded: false,
      posts: null,
      breadcrumbs: [
        {
          url: '/',
          text: 'top page',
        },
        {
          url: this.$route.path,
          text: 'foo',
        },
      ],
    }
  },
  computed: {},
  async mounted() {
    await this.$store.dispatch('posts/fetchPosts')
    this.posts = this.$store.getters['posts/posts']

    if (this.posts) this.isLoaded = true
  },
}
</script>
