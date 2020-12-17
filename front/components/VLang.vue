<template>
  <ul class="lang">
    <li
      v-for="(lang, i) in list"
      :key="i"
      class="lang__item"
      :class="{ 'lang__item--current': lang.current }"
    >
      <component :is="lang.component" :to="lang.to" class="lang__link">{{
        lang.caption
      }}</component>
    </li>
  </ul>
</template>

<script>
import { langConfig } from '@/assets/scripts/utils'

export default {
  name: 'VLang',
  data() {
    return {
      languages: langConfig.languages,
    }
  },
  computed: {    
    list() {
      return this.languages.map(lang => {
        const isCurrentLanguage = lang === this.LANGUAGE
        const component = isCurrentLanguage ? 'span' : 'nuxt-link'
        const current = lang === this.LANGUAGE
        const url = this.$route.name?.split('---')[0] || ''

        let to = `/${lang}/${url}`
        if (lang === 'ru') to = `/${url}`
        if (lang === 'uk') to = `/ua/${url}`
        if (isCurrentLanguage) to = false

        const caption = lang

        return {
          component,
          lang,
          to,
          caption,
          current,
        }
      })
    },
  },
  methods: {
    getUrl(lang) {
      if (lang === 'ru') return `/${this.url}`
      if (lang === 'uk') return `/ua/${this.url}`
      return `/${lang}/${this.url}`
    },
  },
  mounted() {
    console.log(this.list)
  },
}
</script>

<style lang="sass">
.lang
  display: flex
  align-items: center

  &__item
    +notlast
      margin-right: 10px
</style>
