<template>
  <section class="section section--center">
    <div class="container">
      <h1 class="section__title">Strapi-nuxt test project.</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHome',
  async fetch() {
    this.pageData = await this.$store.dispatch('pages/fetchPage', this.$route.meta.id)
  },
  data() {
    return {
      pageData: {},
    }
  },  
}
</script>
