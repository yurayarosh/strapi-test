export default {
  computed: {
    LANGUAGE() {
      return this.$route.meta.language
    },
    homePath() {
      let subfolder = !this.LANGUAGE || this.LANGUAGE === 'ru' ? '' : this.LANGUAGE
      subfolder = subfolder === 'uk' ? 'ua' : subfolder

      if (subfolder.length > 0) return `/${subfolder}/`
      return '/'
    },
  },
}
