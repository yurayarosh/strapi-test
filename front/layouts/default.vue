<template>
  <div class="layout">
    <v-header class="layout__header" />

    <main class="main layout__main">
      <Nuxt />

      <section class="section">
        <div class="container">
          <v-feedback-form v-if="feedbackForm" :form="feedbackForm" />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import setHTMLClassNames from '@/assets/scripts/setHTMLClassNames'
import homePath from '@/mixins/home-path'
// import VForm from '../components/VForm.vue'

export default {
  // components: { VForm },
  async fetch() {
    this.feedbackForm = await this.$store.dispatch('form/fetchForm', 'feedback')
  },
  data() {
    return {
      feedbackForm: null,
    }
  },
  mixins: [homePath],
  mounted() {
    setHTMLClassNames()
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.LANGUAGE,
      },
      meta: [
        {
          property: 'og:site_name',
          content: process.env.BASE_NAME,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: `${process.env.BASE_URL}${this.homePath}`,
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'og:locale',
          content: this.LANGUAGE,
        },
        {
          property: 'og:image',
          content: '/logo.jpg',
        },
        {
          property: 'og:image:height',
          content: '628',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:type',
          content: 'image/jpeg',
        },
      ],
    }
  },
}
</script>
