<template>
  <section class="section">
    <div class="container">
      <ul v-if="products.length > 0" class="products">
        <li v-for="product in products" :key="product.id" class="products__item">
          <v-product-card
            :price="product.price | formatCurrency"
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
import language from '~/mixins/language'
import { PRODUCTS } from '~/assets/scripts/pageTypes'

export default {
  name: 'PageProducts',
  mixins: [language],
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    this.products = await this.$store.dispatch('fetchCollection', { collection: PRODUCTS })
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
