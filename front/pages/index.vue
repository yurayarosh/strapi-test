<template>
  <div class="container">
    <v-breadcrumbs :list="breadcrumbs" />
    <v-input v-model.trim="name" required type="text" label="" maxlength="20" name="name" />

    <p>{{ trimmedName }}</p>
  </div>
</template>

<script>
import VInput from '@/components/VInput'
import VBreadcrumbs from '@/components/VBreadcrumbs'
import microdata from '@/mixins/microdata'

export default {
  name: 'page-home',
  components: {
    VInput,
    VBreadcrumbs,
  },
  mixins: [microdata],
  data() {
    return {
      name: '',
      breadcrumbs: [
        {
          url: 'https://example.com',
          text: 'top page',
        },
        // {
        //   url: `https://example.com/foo${this.$router}`,
        //   text: 'foo',
        // }
      ],
    }
  },
  computed: {
    trimmedName() {
      return this.name.trim()
    },
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
