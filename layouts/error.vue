<template>
  <section class="section">
    <div class="container">
      this is error page
    </div>
  </section>
</template>

<script>
import homePath from '~/mixins/home-path'
import language from '~/mixins/language'
import { langConfig } from '~/assets/scripts/utils'

export default {
  mixins: [homePath, language],
  computed: {
    LANGUAGE() {
      const [, lang] = this.$route.fullPath.split('/')
      if (lang.length !== 2) return langConfig.default
      if (lang === 'ua') return 'uk'
      return lang
    },
  },
}
</script>
