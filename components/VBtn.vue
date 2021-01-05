<template>
  <component :is="href ? 'a' : 'button'" v-bind="$attrs" class="btn" @click="onClick">
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'VBtn',
  props: {
    title: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="sass">
.btn
  $this: &

  display: inline-block
  text-align: center
  padding: 0.5em
  min-width: 220px
  border: 2px solid $black
  background-color: $black
  color: $white
  text-transform: uppercase

  +tr(background-color .4s, border-color .4s, color .4s)

  +hover-focus
    &:not(#{$this}--no-hover)
      background-color: transparent
      color: $black

  &--disabled
    opacity: 0.5
    cursor: not-allowed
</style>
