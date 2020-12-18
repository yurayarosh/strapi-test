<template>
  <div class="container">
    {{ homePath }}
    <v-breadcrumbs :list="breadcrumbs" />
    <v-input v-model.trim="name" required type="text" label="" maxlength="20" name="name" />
  </div>
</template>

<script>
import VInput from '@/components/VInput'
import VBreadcrumbs from '@/components/VBreadcrumbs'
import microdata from '@/mixins/microdata'
import homePath from '@/mixins/home-path'

export default {
  name: 'PageHome',
  components: {
    VInput,
    VBreadcrumbs,
  },
  mixins: [microdata, homePath],
  data() {
    return {
      name: '',
    }
  },
  computed: {
    breadcrumbs() {
      if (!this.pageData?.length) return []

      const arr = this.pageData.parents_pages.map(page => ({
        url: `/${page.alias}`,
        text: page[`title_${this.LANGUAGE}`],
      }))

      return arr
      // return [
      //   {
      //     url: this.homePath,
      //     text: 'top page',
      //   },
      //   // {
      //   //   url: `https://example.com/foo${this.$router}`,
      //   //   text: 'foo',
      //   // }
      // ]
    },
  },
  async mounted() {
    this.pageData = await this.$store.dispatch('pages/fetchPage', this.$route.meta.id)

    console.log(this.breadcrumbs)
    // const response = await fetch(`${process.env.BASE_URL_BACK}/pages/${this.$route.meta.id}`)
    // const pageData = await response.json()
    // console.log(pageData)
    // console.log(this.$route.meta)
  },
}
</script>

<style lang="sass">
.container
  width: 100%
  max-width: 1000px
  margin-left: auto
  margin-right: auto
</style>
