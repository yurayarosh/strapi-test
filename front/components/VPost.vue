<template>
  <nuxt-link :to="url" class="post">
    <img
      :src="`${BASE_URL_BACK}${img.formats.medium.url}`"
      :alt="img.alternativeText"
      :title="img.caption"
      class="post__img"
    />
    <p class="post__title">{{ title }}</p>

    <p v-if="description" class="post__text">{{ description }}</p>

    <time v-if="date" :datetime="date">{{ date | formatDate(LANGUAGE) }}</time>
  </nuxt-link>
</template>

<script>
import language from '@/mixins/language'

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
}
</script>
