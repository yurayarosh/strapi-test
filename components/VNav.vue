<template>
  <nav v-if="filteredList.length > 0" class="nav">
    <ul class="nav__list">
      <li v-for="(item, i) in filteredList" :key="i" class="nav__item">
        <nuxt-link
          :to="item.alias || homePath"
          class="nav__link"
          exact-active-class="nav__link--current"
          >{{ item.caption }}</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import homePath from '@/mixins/home-path'

export default {
  name: 'VNav',
  mixins: [homePath],
  data() {
    return {
      nav: [],
    }
  },
  computed: {
    isHome() {
      return !this.$route.name
    },
    list() {
      if (this.nav?.length > 0) {
        return this.nav.map(item => {
          return {
            caption: item[`title_${this.LANGUAGE}`],
            alias: item.page.alias,
            // alias: `${process.env.BASE_URL}`,
          }
        })
      }
      return []
    },
    filteredList() {
      if (this.isHome) return [...this.list.slice(1)]
      return [...this.list]
    },
  },
  async fetch() {
    await this.$store.dispatch('pages/fetchNavList')
    this.nav = this.$store.getters['pages/navList']
  },
  methods: {
    addHomeNavItem(i) {
      if (this.isHome && i === 0) return false
      return true
    },
  },
  mounted() {
    console.log(this.$route)
  },
}
</script>

<style lang="sass">
.nav
  $this: &

  text-transform: uppercase
  font-weight: 700

  &__list
    display: flex
    align-items: center
    justify-content: center

  &__item
    padding-left: 10px
    padding-right: 10px

  &__link
    +tr(color .3s)
    +hover
      @extend #{$this}__link--current
    
    &--current
      color: $dark
</style>
