export default {
  jsonld() {
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      url: process.env.BASE_URL,
    }

    const breadcrumbsItems = this.breadcrumbs.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'WebPage',
        '@id': `${process.env.BASE_URL}${item.url}`,
        name: item.text,
      },
    }))

    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbsItems,
    }

    const data = [organization, breadcrumbs].filter(item => item)

    return data
  },
}
