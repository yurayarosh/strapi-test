<template>
  <page-home v-if="page === 'home'" />
  <page-posts v-else-if="page === 'posts'" />
</template>

<script>
import PageHome from '@/pages/index'
import PagePosts from '@/pages/posts'

export default {
  name: 'SinglePage',
  components: {
    PageHome,
    PagePosts,
  },
  computed: {
    page() {
      if (!this.$route.name) return 'home'

      const [name] = this.$route.name.split('---')
      return name
    },
  },
}
</script>
