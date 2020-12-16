<template>
  <header class="header">
    <component
      :is="isHome ? 'div' : 'nuxt-link'"
      class="header__logo logo"
      :to="!isHome ? homePath : false"
      >logo</component
    >

    <v-nav class="header__nav" />

    <v-lang class="header__lang" />
  </header>
</template>

<script>
export default {
  name: 'VHeader',
  data() {
    return {
      LANGUAGE: this.$route.meta.language,
    }
  },
  computed: {
    isHome() {
      return !this.$route.name
    },
    homePath() {
      let subfolder = this.LANGUAGE === 'ru' ? '' : this.LANGUAGE
      subfolder = subfolder === 'uk' ? 'ua' : subfolder

      if (subfolder.length > 0) return `/${subfolder}/`
      return '/'
    },
  },
  mounted() {},
}
</script>
