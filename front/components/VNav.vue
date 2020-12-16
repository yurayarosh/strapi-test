<template>
  <nav v-if="filteredList.length > 0" class="nav">
    <ul class="nav__list">
      <li v-for="(item, i) in filteredList" :key="i" class="nav__item">
        <nuxt-link :to="item.alias || homeUrl" class="nav__link">{{ item.caption }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'VNav',
  data() {
    return {
      LANGUAGE: this.$route.meta.language,
      list: [],
    }
  },
  computed: {
    isHome() {
      return !this.$route.name
    },
    homeUrl() {
      if (this.LANGUAGE === 'uk') return '/ua/'
      if (this.LANGUAGE === 'ru') return '/'
      return `/${this.LANGUAGE}/`
    },
    filteredList() {
      if (this.isHome) return [...this.list.slice(1)]
      return [...this.list]
    },
  },
  methods: {
    addHomeNavItem(i) {
      if (this.isHome && i === 0) return false
      return true
    },
  },
  async mounted() {
    await this.$store.dispatch('pages/fetchPages')

    this.pages = this.$store.getters['pages/pages']
    this.list = this.pages.map(page => {
      return {
        caption: page[`caption_${this.LANGUAGE}`],
        alias: page.alias,
      }
    })
  },
}
</script>
