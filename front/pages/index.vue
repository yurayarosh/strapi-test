<template>
  <div class="container">
    {{ homePath }}
    <v-breadcrumbs :list="breadcrumbs" />
    <v-input v-model.trim="name" required type="text" label="" maxlength="20" name="name" />

    <p>{{ trimmedName }}</p>
  </div>
</template>

<script>
import VInput from '@/components/VInput'
import VBreadcrumbs from '@/components/VBreadcrumbs'
import microdata from '@/mixins/microdata'
import homePath from '@/mixins/home-path'

export default {
  name: 'PageHome',
  components: {
    VInput,
    VBreadcrumbs,
  },
  mixins: [microdata, homePath],
  data() {
    return {
      name: '',
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          url: this.homePath,
          text: 'top page',
        },
        // {
        //   url: `https://example.com/foo${this.$router}`,
        //   text: 'foo',
        // }
      ]
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
