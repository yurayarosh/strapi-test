<template>
  <section class="section">
    <div class="container">
      this is error page
    </div>
  </section>
</template>

<script>
import { langConfig } from '~/assets/scripts/utils'
import homePath from '~/mixins/home-path'
import language from '~/mixins/language'

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
