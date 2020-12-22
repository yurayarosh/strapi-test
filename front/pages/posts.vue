<template>
  <section class="section">
    <div class="container">
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
    </div>
  </section>
</template>

<script>
export default {
  name: 'PagePosts',
  mixins: [],
  data() {
    const { BASE_URL } = process.env

    return {
      LANGUAGE: this.$route.meta.language,
      name: '',
      isLoaded: false,
      posts: null,
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

<style lang="sass">
.posts
  @extend %row
  
  margin-left: -15px
  margin-right: -15px

  &__item
    width: 50%
    padding-left: 15px
    padding-right: 15px
</style>
