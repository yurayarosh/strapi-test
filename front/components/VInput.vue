<template>
  <div class="form-input" :class="classes">
    <label class="form-input__label" :for="_uid">{{ label }}</label>
    <component
      :is="element === 'textarea' ? 'textarea' : 'input'"      
      :id="_uid"
      ref="input"
      :value="value"      
      v-bind="$attrs"
      class="form-input__input"
      @input="inputHandler"
      @focus="focusHandler"
      @blur="blurHandler"
    >
      {{ element === 'textarea' ? value : '' }}
    </component>
    <transition name="form-input__errors" duration="1000">
      <div v-show="!!errorMessage && showErrors" class="form-input__errors">
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
        'form-input_focus': this.isFocus,
        'form-input_has-label': !!this.label,
        'form-input_has-value': !!this.value,
      }
    },
    // fieldClass() {
    //   return {
    //     'form-input__input_tall': (this.type === 'textarea' && this.isFocus)
    //       || (this.type === 'textarea' && this.value)
    //   }
    // }
  },
  mounted() {},
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
