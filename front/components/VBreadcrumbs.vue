<template>
  <ul class="breadcrumbs">
    <li v-for="(item, i) in list" :key="i">
      <nuxt-link :to="item.url">
        {{ item.text }}
      </nuxt-link>
    </li>
  </ul>
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
