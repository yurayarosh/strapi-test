<template>
  <section class="section">
    <div class="container">
      <h1 class="section__title title title--h1">{{ pageData[`title_${LANGUAGE}`] }}</h1>

      <fragment v-if="products.length > 0">
        <ul class="products">
          <li v-for="product in products" :key="product.id" class="products__item">
            <v-product-card
              :item-id="product.id"
              :price="product.price | formatCurrency"
              :title="product[`title_${LANGUAGE}`]"
              :img="product.img"
              :description="product[`description_${LANGUAGE}`]"
              :quantity="product.quantity"
            />
          </li>
        </ul>

        <p class="title title--h2">Сумма: {{ price | formatCurrency }}</p>
      </fragment>

      <p v-else class="loader">Loading...</p>
    </div>
  </section>
</template>

<script>
import language from '@/mixins/language'

export default {
  name: 'PageCart',
  mixins: [language],
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    products() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
  },
  // mounted() {
  //   console.log(this.products)
  // },
}
</script>

<style lang="sass">
.posts
  @extend %row

  margin-left: -15px
  margin-right: -15px

  &__item
    width: 50%
    padding-left: 15px
    padding-right: 15px
</style>
