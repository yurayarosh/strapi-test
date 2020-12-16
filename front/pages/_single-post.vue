<template>
  <section class="section">
    <div class="container">
      <!-- {{ post.text }} -->
    </div>
  </section>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('posts/fetchPosts')
    ;[this.post] = this.$store.getters['posts/posts'].filter(({ alias }) => `/${alias}` === this.$route.path)

    console.log(this.$store.getters['posts/posts'])
  },
}
</script>
