<template>
  <div class="layout">
    <v-header class="layout__header"/>

    <main class="main layout__main">
      <Nuxt />
    </main>
  </div>
</template>

<script>

export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$route.meta.language,
      },
    }
  },
  mounted() {
    // console.log(this.$store.getters)

    // console.log(this.$route)
    // console.log(this.$route)
  },
}
</script>
