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
