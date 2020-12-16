import Vue from 'vue'
Vue.filter('formatDate', value => {
  const date = new Date(value)
  return date.toLocaleString(['uk-UK'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
