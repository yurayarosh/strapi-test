<template>
  <ul class="lang">
    <li
      v-for="(lang, i) in list"
      :key="i"
      class="lang__item"
      :class="{ 'lang__item--current': lang.current }"
    >
      <component :is="lang.component" :to="lang.to" :class="lang.className">{{
        lang.caption
      }}</component>
    </li>
  </ul>
</template>

<script>
import { langConfig } from '@/assets/scripts/utils'
import language from '@/mixins/language'

export default {
  name: 'VLang',
  mixins: [language],
  data() {
    return {
      languages: langConfig.languages,
    }
  },
  computed: {
    list() {
      return this.languages.map(lang => {
        const isCurrentLanguage = lang === this.LANGUAGE
        const className = isCurrentLanguage ? '' : 'lang__link'
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
          className,
          lang,
          to,
          caption,
          current,
        }
      })
    },
  },
}
</script>

<style lang="sass">
.lang
  display: flex
  align-items: center
  text-transform: uppercase

  &__item
    +notlast
      margin-right: 10px

    &--current
      color: $dark

  &__link
    +hover-focus
      text-decoration: underline
</style>
