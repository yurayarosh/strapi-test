<template>
  <div v-if="pageData" v-html="pageData[`plain_content_${LANGUAGE}`]"/>
</template>

<script>
import language from '@/mixins/language'

export default {
  name: 'Page',
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },
  mixins: [language],
}
</script>
