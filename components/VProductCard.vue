<template>
  <component :is="url ? 'nuxt-link' : 'div'" :to="url || false" class="card">
    <span class="card__img">
      <img
        v-if="img"
        :src="`${img.formats.medium.url}`"
        :alt="img.alternativeText"
        :title="img.caption"
      />
    </span>
    <span class="card__content">
      <span class="card__title">{{ title }}</span>

      <span v-if="description" class="card__text">{{ description }}</span>
    </span>
  </component>
</template>

<script>
export default {
  name: 'VProductCard',
  props: {
    url: {
      type: String,
      default: '',
    },
    img: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
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

<style lang="sass">
.card
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
