<template>
  <nuxt-link :to="url" class="post">
    <span class="post__img">
      <img
        v-if="img"
        :src="`${BASE_URL_BACK}${img.formats.medium.url}`"
        :alt="img.alternativeText"
        :title="img.caption"
      />
    </span>
    <span class="post__content">
      <time v-if="date" :datetime="date" class="post__date">{{ date | formatDate(LANGUAGE) }}</time>

      <span class="post__title">{{ getPostTitle(title) }}</span>

      <span v-if="description" class="post__text">{{ description }}</span>
    </span>
  </nuxt-link>
</template>

<script>
import language from '@/mixins/language'
import { getPostTitle } from '@/assets/scripts/helpers'

export default {
  name: 'VPost',
  mixins: [language],
  props: {
    url: {
      type: String,
      required: true,
    },
    img: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      BASE_URL_BACK: process.env.BASE_URL_BACK,
    }
  },
  methods: {
    getPostTitle,
  },
}
</script>

<style lang="sass">
.post
  &__date
    display: block
    color: $dark
    margin-bottom: 5px

  &__img
    display: block
    width: 100%
    margin-bottom: 15px
    font-size: 0
    position: relative
    padding-top: 60%
    background-color: #ccc

    img
      @extend %coverdiv
      @extend %coverimage

  &__content
    display: flex
    flex-direction: column
    flex-grow: 1

  &__title
    display: block
    margin-bottom: 15px
    font-size: 1.5em
    font-weight: 700

  &__text
    flex-grow: 1
</style>
