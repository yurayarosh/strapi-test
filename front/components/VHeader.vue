<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <component
          :is="isHome ? 'div' : 'nuxt-link'"
          class="header__logo logo"
          :to="!isHome ? homePath : false"
          >logo</component
        >

        <v-nav class="header__nav" />

        <v-lang class="header__lang" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'VHeader',
  computed: {
    LANGUAGE() {
      return this.$route.meta.language
    },
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

<style lang="sass">
.header
  background-color: #ccc
  
  &__inner
    display: flex
    align-items: center
    justify-content: space-between
    height: 60px
</style>
