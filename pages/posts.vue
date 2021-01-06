<template>
  <section class="section">
    <div class="container">
      <ul v-if="posts.length > 0" class="posts">
        <li v-for="post in posts" :key="post.id" class="posts__item">
          <v-post
            :url="post.alias"
            :title="post[`title_${LANGUAGE}`]"
            :img="post.img"
            :description="post[`description_${LANGUAGE}`]"
            :date="post.published_at"
          />
        </li>
      </ul>

      <p v-else class="loader">Loading...</p>
    </div>
  </section>
</template>

<script>
import language from '~/mixins/language'
import { POSTS } from '~/assets/scripts/pageTypes'
import { sortList } from '~/assets/scripts/helpers'

export default {
  name: 'PagePosts',
  mixins: [language],
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      posts: [],
    }
  },
  async created() {
    this.posts = await this.$store.dispatch('fetchCollection', { collection: POSTS })
    sortList(this.posts, 'date')
  },
}
</script>

<style lang="sass">
.posts
  @extend %row

  margin-left: -15px
  margin-right: -15px

  &__item
    width: 50%
    padding-left: 15px
    padding-right: 15px
</style>
