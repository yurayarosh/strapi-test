<template>
  <section class="section">
    <div class="container">
      <ul v-if="products.length > 0" class="products">
        <li v-for="product in products" :key="product.id" class="products__item">
          <v-product-card
            :url="product.alias"
            :title="product[`title_${LANGUAGE}`]"
            :img="product.img"
            :description="product[`description_${LANGUAGE}`]"
          />
        </li>
      </ul>

      <p v-else class="loader">Loading...</p>
    </div>
  </section>
</template>

<script>
import language from '@/mixins/language'

export default {
  name: 'PageProducts',
  mixins: [language],
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    this.products = await this.$store.dispatch('fetchCollection', { collection: 'products' })
  },
  data() {
    return {
      products: [],
    }
  },
}
</script>

<style lang="sass">
.products
  @extend %row

  margin-left: -15px
  margin-right: -15px

  &__item
    width: percentage(1 / 3)
    padding-left: 15px
    padding-right: 15px
</style>
