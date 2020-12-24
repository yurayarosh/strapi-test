<template>
  <div class="input" :class="classes">
    <label class="input__label" :for="_uid">{{ label }}</label>
    <component
      :is="element === 'textarea' ? 'textarea' : 'input'"
      :id="_uid"
      :value="value"
      v-bind="$attrs"
      class="input__input"
      @input="inputHandler"
      @focus="focusHandler"
      @blur="blurHandler"
    >
      {{ element === 'textarea' ? value : '' }}
    </component>
    <transition name="input__errors" duration="1000">
      <div v-show="!!errorMessage && showErrors" class="input__errors">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    element: {
      type: String,
      default: 'input',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: 'input',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    isFocus: false,
    showErrors: false,
  }),
  computed: {
    classes() {
      return {
        input_focus: this.isFocus,
        'input_has-label': !!this.label,
        'input_has-value': !!this.value,
      }
    },
    // fieldClass() {
    //   return {
    //     'form-input__input_tall': (this.type === 'textarea' && this.isFocus)
    //       || (this.type === 'textarea' && this.value)
    //   }
    // }
  },
  methods: {
    inputHandler(e) {
      this.$emit('input', e.target.value)
    },
    focusHandler(e) {
      this.$emit('focus', e)
      this.isFocus = true
    },
    blurHandler(e) {
      this.$emit('blur', e)
      this.isFocus = false
      this.showErrors = true
    },
  },
}
</script>

<style lang="sass">
.input
  text-align: left
  &__label
    display: block
    margin-bottom: 5px
  
  &__input
    border: 1px solid $dark
    height: 30px
    width: 100%
    padding: 0.3rem
</style>
