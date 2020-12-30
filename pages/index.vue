<template>
  <section class="section section--center">
    <div class="container">
      <h1 class="title title--h1 section__title">Strapi-nuxt test project.</h1>
      <p class="section__text">
        This is test project, build with frontend Vue framework
        <a href="https://nuxtjs.org/" class="link" target="_blank">Nuxt.js</a> and
        <a href="https://strapi.io/" class="link" target="_blank"
          >Strapi open source Node.js Headless CMS</a
        >
      </p>
      <!-- <h2 class="title title--h3">Access to admin panel:</h2>

      <ul class="list">
        <li><a :href="`${BASE_URL_BACK}/admin`" class="link" target="_blank">{{ `${BASE_URL_BACK}/admin` }}</a></li>
        <li>Email: {{ ADMIN_GUEST_LOGIN }}</li>
        <li>Password: {{ ADMIN_GUEST_PASSWORD }}</li>
      </ul> -->
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
  data() {
    return {
      BASE_URL_BACK: process.env.BASE_URL_BACK,
      ADMIN_GUEST_LOGIN: 'editor@gmail.com',
      ADMIN_GUEST_PASSWORD: 'k27b6NB?YcJ2RY_-',
    }
  },
}
</script>
