export default {
  data() {
    return {
      pageData: {},
      postsPage: {},
    }
  },
  computed: {
    breadcrumbs() {
      const isDynamicPage = !this.pageData.parents_pages
      let parents = this.pageData.parents_pages || []
      let rootPage

      if (isDynamicPage) {
        rootPage = this.postsPage || {} // posts, products e.g.
        if (rootPage.parents_pages) parents = [...rootPage.parents_pages, rootPage]
      }

      const [currentNavItem] = isDynamicPage
        ? []
        : this.$store.getters['pages/navList'].filter(({ id }) => id === this.$route.meta.id)

      const list = parents.map(page => {
        const [navItem] = this.$store.getters['pages/navList'].filter(
          ({ id }) => id === page.nav_item || id === page.nav_item.id
        )

        return {
          page,
          navItem,
        }
      })

      const currentPage = {
        isCurrent: true,
        page: this.pageData,
        navItem: currentNavItem || { ...this.pageData, isDynamicPage: true },
      }

      return [...list, currentPage]
    },
    pageBreadcrumbs() {
      return this.breadcrumbs.map(({ page, navItem, isCurrent }) => {
        const url = page.alias === null ? this.homePath : page.alias
        const text = navItem?.isDynamicPage
          ? navItem?.[`title_${this.LANGUAGE}`] // Change dynamic page (post) breadcrumb title if necessary.
          : navItem?.[`title_${this.LANGUAGE}`]

        return {
          text,
          url: isCurrent ? false : url,
        }
      })
    },
  },
  jsonld() {
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      url: process.env.BASE_URL,
    }

    const breadcrumbsItems =
      this.breadcrumbs?.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'WebPage',
          '@id': `${process.env.BASE_URL}${item.url}`,
          name: item.text,
        },
      })) || []

    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbsItems,
    }

    const data = [organization, breadcrumbs].filter(item => item)

    return data
  },
}
