<template>
  <div class="layout">
    <v-header class="layout__header"/>

    <main class="main layout__main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import setHTMLClassNames from '@/assets/scripts/setHTMLClassNames'

export default {
  head() {
    return {
      // title: this.pageData[`title_${this.LANGUAGE}`],
      htmlAttrs: {
        lang: this.$route.meta.language,
      },
    }
  },
  mounted() {
    setHTMLClassNames()
  },
}
</script>
