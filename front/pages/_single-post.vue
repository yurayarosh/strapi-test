<template>
  <section class="section">
    <div v-if="isLoaded" class="container">
      <h1>{{ post[`title_${LANGUAGE}`] }}</h1>

      <div v-html="post[`text_${LANGUAGE}`]" class="article__inner"></div>
    </div>

    <div v-else class="container">
      Loading...
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      LANGUAGE: this.$route.meta.language,
      isLoaded: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('posts/fetchPosts')
    ;[this.post] = this.$store.getters['posts/posts'].filter(({ id }) => id === this.$route.meta.id)

    this.isLoaded = true
  },
}
</script>
