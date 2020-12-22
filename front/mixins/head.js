export default {
  head() {
    return {
      title: this.pageData[`title_${this.LANGUAGE}`],
      meta: [
        {
          name: 'msapplication-TileColor',
          content: '#000000',
        },
        {
          name: 'msapplication-TileImage',
          content: '/mstile-144x144.png',
        },
        {
          name: 'theme-color',
          content: '#000000',
        },
        {
          property: 'description',
          content: this.pageData[`description_${this.LANGUAGE}`],
        },
        {
          property: 'og:title',
          content:
            this.pageData[`og_title_${this.LANGUAGE}`] || this.pageData[`title_${this.LANGUAGE}`],
        },
        {
          property: 'og:description',
          content:
            this.pageData[`og_description_${this.LANGUAGE}`] ||
            this.pageData[`description_${this.LANGUAGE}`],
        },
      ],
      link: [
        {
          rel: 'alternate',
          href: `${process.env.BASE_URL}/ua/${this.pageData.alias}`,
          hreflang: 'uk',
        },
        {
          rel: 'alternate',
          href: `${process.env.BASE_URL}/${this.pageData.alias}`,
          hreflang: 'ru',
        },
        {
          rel: 'alternate',
          href: `${process.env.BASE_URL}/${this.pageData.alias}`,
          hreflang: 'x-default',
        },
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}${this.homePath}`,
        },
      ],
    }
  },
}
