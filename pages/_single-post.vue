<template>
  <fragment>
    <div class="container">
      <v-breadcrumbs :list="pageBreadcrumbs" class="main__breadcrumbs" />
    </div>

    <section class="section">
      <div class="container">
        <div class="article__inner" v-html="pageData[`text_${LANGUAGE}`]" />
      </div>

      <!-- <div v-else class="container">
        Loading...
      </div> -->
    </section>
  </fragment>
</template>

<script>
import microdata from '~/mixins/microdata'
import head from '~/mixins/head'
import fetchDynamicPage from '~/assets/scripts/fetchDynamicPage'
import { PAGES, POSTS } from '~/assets/scripts/pageTypes'

export default {
  mixins: [microdata, head],
  async created() {
    const { pageData, rootPage } = await fetchDynamicPage({
      ctx: this,
      collection: POSTS,
    })

    this.pageData = pageData
    this.postsPage = rootPage
    // this.isLoaded = true
  },
  mounted() {
    setTimeout(() => {
      console.log(this.pageData)
    }, 2000)
  },
  // data() {
  //   return {
  //     pageData: {},
  //     postsPage: {},
  //   }
  // },
  // mounted() {
  //   this.isLoaded = true
  // },
}
</script>
