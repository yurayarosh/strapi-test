<template>
  <section class="section">
    <v-breadcrumbs class="section__breadcrumbs" :list="breadcrumbs" />

    <ul v-if="isLoaded" class="posts">
      <li v-for="(post, i) in posts" :key="i" class="posts__item">
        <v-post
          :url="post.alias"
          :title="post.title"
          :img="post.img"
          :shortText="post.shortText"
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
  mixins: [microdata],
  data() {
    const { BASE_URL } = process.env

    return {
      name: '',
      isLoaded: false,
      posts: null,
      breadcrumbs: [
        {
          url: `${BASE_URL}/`,
          text: 'top page',
        },
        {
          url: `${BASE_URL}${this.$route.path}`,
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
