<template>
  <section class="section section--center">
    <div class="container">
      <h1 class="section__title">Strapi-nuxt test project.</h1>
    </div>
  </section>
</template>

<script>
import microdata from '@/mixins/microdata'
import homePath from '@/mixins/home-path'

export default {
  name: 'PageHome',
  mixins: [microdata, homePath],
  data() {
    return {
      pageData: {},
    }
  },
  async fetch() {
    this.pageData = await this.$store.dispatch('pages/fetchPage', this.$route.meta.id)
  },
}
</script>
