<template>
  <fragment>
    <div v-if="pageBreadcrumbs.length > 1" class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>
    <page-home v-if="pageName === 'home'" :page-data="pageData" />
    <page-posts v-else-if="pageName === 'posts'" :page-data="pageData" />
    <page v-else :page-data="pageData" />

    <section class="section">
      <div class="container">
        <v-feedback-form v-if="feedbackForm" :form="feedbackForm" />
      </div>
    </section>
  </fragment>
</template>

<script>
import homePath from '@/mixins/home-path'
import microdata from '@/mixins/microdata'
import PageHome from '@/pages/index'
import PagePosts from '@/pages/posts'
import Page from '@/pages/page'
import head from '@/mixins/head'

export default {
  name: 'SinglePage',
  components: {
    Page,
    PageHome,
    PagePosts,
  },
  mixins: [homePath, microdata, head],
  async fetch() {
    this.pageData = await this.$store.dispatch('pages/fetchPage', this.$route.meta.id)
    this.feedbackForm = await this.$store.dispatch('form/fetchFeedbackForm')

    console.log(this.feedbackForm)
  },
  data() {
    return {
      feedbackForm: null,
    }
  },
  computed: {
    pageName() {
      if (!this.$route.name) return 'home'

      const [name] = this.$route.name.split('---')
      return name
    },
  },
}
</script>
