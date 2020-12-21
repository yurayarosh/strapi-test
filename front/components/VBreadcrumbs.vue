<template>
  <div class="container">
    <ul v-if="list.length > 0" class="breadcrumbs">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="breadcrumbs__item"
        :class="{ 'breadcrumbs__item--current': i === list.length - 1 }"
      >
        <component
          :is="item.url ? 'nuxt-link' : 'span'"
          :to="item.url"
          :class="{ breadcrumbs__link: item.url }"
        >
          {{ item.text }}
        </component>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VBreadcrumbs',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="sass">
.breadcrumbs
  @extend %row

  &__item
    display: inline-flex
    align-items: center

    +notlast
      &::after
        content: '-'
        margin-left: .5em
        margin-right: .5em

  &__link
    +hover-focus
      text-decoration: underline
</style>
