<template>
  <section class="section section--center">
    <div class="container">
      <h1 class="section__title">Strapi-nuxt test project.</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHome',
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
}
</script>
