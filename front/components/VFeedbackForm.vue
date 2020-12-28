<template>
  <div class="form">
    <p class="form__title title title--h2">{{ form[`title_${LANGUAGE}`] }}</p>

    <form class="form__form" @submit.prevent="onSubmit">
      <div v-for="field in form.fields" :key="field.id" class="form__field">
        <v-input
          :ref="field.name"
          v-model="inputs[field.name].value"
          v-mask="inputs[field.name].mask"
          :type="field.type"
          :placeholder="field[`placeholder_${LANGUAGE}`]"
          :name="field.name"
          :label="field[`label_${LANGUAGE}`]"
          class="input__field"
        />
      </div>

      <div class="form__field">
        <v-btn :disabled="!isValid" :class="{ 'btn--disabled': !isValid }">{{
          form.btn[`title_${LANGUAGE}`]
        }}</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { VueMaskDirective } from 'v-mask'
import language from '@/mixins/language'
import validate from '@/mixins/validate'

export default {
  name: 'VFeedbackForm',
  directives: {
    mask: VueMaskDirective,
  },
  mixins: [language, validate],
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    let inputs = {}

    this.form.fields.forEach(({ name, mask, validation }) => {
      const validations = validation ? { ...validation } : false
      if (validations) delete validations.id

      inputs = {
        ...inputs,
        [name]: {
          mask,
          validations,
          value: '',
        },
      }
    })

    return {
      inputs,
    }
  },
  methods: {
    clearFields() {
      Object.values(this.inputs).forEach((input, i) => {
        const key = Object.keys(this.inputs)[i]
        input.value = ''
        this.$refs[key][0].$el.querySelector('.input__input').value = ''
      })
    },
    async sendMessage() {
      const date = new Intl.DateTimeFormat('uk-UK', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(new Date())

      let message = `Дата: ${date}`
      if (this.inputs.username.value) message += `\nИмя: ${this.inputs.username.value}`
      if (this.inputs.phone.value) message += `\nТелефон: ${this.inputs.phone.value}`

      try {
        const response = await fetch(
          `${process.env.TELEGRAM_API_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: message,
            }),
          },
        )

        if (response.ok) this.clearFields()
      } catch (error) {
        console.error(error)
      }
    },
    async onSubmit() {
      if (!this.isValid) return

      await this.sendMessage()
    },
  },
}
</script>

<style lang="sass">
.form
  text-align: center
  max-width: 430px
  margin-left: auto
  margin-right: auto

  &__field
    +notlast
      margin-bottom: 10px

  &__title
    margin-bottom: 30px
</style>
