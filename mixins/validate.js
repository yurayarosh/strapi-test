import { req, minLength } from '~/assets/scripts/validations'

export default {
  computed: {
    isValid() {
      const validatedInputs = Object.values(this.inputs).filter(({ validations }) => validations)

      const validateInputs = ({ validations, value }) => {
        const validNames = Object.keys(validations)
        const validValues = Object.values(validations)

        const processed = []

        const checkValid = (name, i) => {
          if (name === 'required') processed.push(req(value))
          if (name === 'min_length') processed.push(minLength(value, validValues[i]))

          return !processed.some(el => !el)
        }

        return validNames.filter(checkValid).length === validNames.length
      }

      return validatedInputs.filter(validateInputs).length === validatedInputs.length
    },
  },
}
