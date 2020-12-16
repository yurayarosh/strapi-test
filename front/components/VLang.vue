<template>
  <ul class="lang">
    <li class="lang__item">
      <nuxt-link :to="`/${url}`" class="lang__link">ru</nuxt-link>
      <nuxt-link :to="`/ua/${url}`" class="lang__link">uk</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VLang',
  computed: {
    url() {
      return this.$route.name?.split('-')[0]
    },
  },
}
</script>
