<template>
  <fragment>
    <section v-if="pageData && pageData.hero" class="hero">
      <h1 class="hero__title title title--h1">{{ pageData.hero[`title_${LANGUAGE}`] }}</h1>
    </section>

    <fragment v-if="pageData && pageData.sections && pageData.sections.standart_sections">
      <section
        v-for="section in pageData.sections.standart_sections"
        :key="section.id"
        class="section"
      >
        <div class="container">
          <h2 class="section__title title title--h2">{{ section[`title_${LANGUAGE}`] }}</h2>
        </div>
      </section>
    </fragment>

    <div
      v-if="pageData && pageData[`plain_content_${LANGUAGE}`]"
      v-html="pageData[`plain_content_${LANGUAGE}`]"
    />
  </fragment>
</template>

<script>
import language from '@/mixins/language'

export default {
  name: 'Page',
  mixins: [language],
  props: {
    pageData: {
      type: Object,
      required: true,
    },
  },  
}
</script>
