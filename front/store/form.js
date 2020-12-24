export const actions = {
  async fetchForms() {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/forms`)
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  },
  async fetchForm(ctx, type) {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/forms?type=${type}`)
      return (await response.json())[0]
    } catch (error) {
      console.error(error)
    }
  },
  async fetchFeedbackForm() {
    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/feedback-form`)
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  },
}
