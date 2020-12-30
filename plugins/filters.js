import Vue from 'vue'

Vue.filter('formatDate', (value, lang) => {
  const date = new Date(value)
  const locale = `${lang.toLowerCase()}-${lang.toUpperCase()}`

  return date.toLocaleString([locale], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
